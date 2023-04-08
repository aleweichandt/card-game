import {Server as IOServer, ServerOptions} from "socket.io";
import {
  ClientToServerEvents,
  InterServerEvents,
  ServerToClientEvents,
  SocketData
} from "@/service/types";
import {Server} from "http";
import {serverBinding} from "@/service/serverBinding";
import {socketBinding} from "@/service/socketBinding";

const createServer = (server: Server, options?: Partial<ServerOptions>) => {
  const io = new IOServer<
    ClientToServerEvents,
    ServerToClientEvents,
    InterServerEvents,
    SocketData
  >(server, options);

  serverBinding(io)

  io.on('connection', (socket) => {
    // @ts-ignore
    socketBinding(socket, io)
  })
  return io;
}

export default createServer

