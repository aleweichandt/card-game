import {Server as IOServer, ServerOptions} from "socket.io";
import {
  ClientToServerEvents,
  InterServerEvents,
  ServerToClientEvents,
  SocketData
} from "@/modules/service/types";
import {Server} from "http";
import {serverBinding} from "@/modules/service/serverBinding";
import {socketBinding} from "@/modules/service/socketBinding";

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

