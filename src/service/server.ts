import {Server as IOServer, ServerOptions} from "socket.io";
import {ClientToServerEvents, GameServer, InterServerEvents, ServerToClientEvents, SocketData} from "@/service/types";
import {Server} from "http";

const debugLog = (...args: any[]) => {
  console.log('--Server:', ...args)
}

const createServer = (server: Server, options?: Partial<ServerOptions>) => {
  const io: GameServer = new IOServer<
    ClientToServerEvents,
    ServerToClientEvents,
    InterServerEvents,
    SocketData
  >(server, options);

  io.use((socket, next) => {
    const {profile} = socket.handshake.auth;
    debugLog('authWith', profile)
    if (!profile) {
      return next(new Error("invalid username"));
    }
    // @ts-ignore
    socket.profile = profile;
    next();
  });

  io.on('connection', (socket) => {
    socket.on('sendMessage', (msg) => {
      // @ts-ignore
      const {profile} = socket;
      if (profile) {
        io.emit('newMessage', profile, msg)
      }
    })
  })
  return io;
}

export default createServer

