import {Server as IOServer, ServerOptions} from "socket.io";
import {
  ClientToServerEvents,
  GameServer,
  InterServerEvents,
  Profile,
  ServerToClientEvents,
  SocketData
} from "@/service/types";
import {Server} from "http";
import roomId from "@/pages/room/[roomId]";

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
    const { profile } = socket.handshake.auth;
    debugLog('authWith', profile)
    if (!profile) {
      return next(new Error("invalid username"));
    }
    // @ts-ignore
    socket.profile = profile;
    next();
  });

  io.on('connection', (socket) => {
    let currentRoomId: string | undefined;
    // @ts-ignore
    const profile: Profile = socket.profile;

    const runInRoom = (fn: (roomId: string) => void) => {
      if(currentRoomId) {
        debugLog('currentRoomId', currentRoomId)
        fn(currentRoomId)
      }
    }

    socket.on('disconnect', () => {
      runInRoom((roomId) => {
        socket.in(roomId).emit('playerLeft', profile)
        currentRoomId = undefined;
      })
    })
    socket.on('joinRoom', (newRoomId) => {
      if(currentRoomId === newRoomId) {
        return;
      }
      runInRoom((roomId) => {
        socket.in(roomId).emit('playerLeft', profile)
        socket.leave(roomId);
      })
      socket.join(newRoomId);
      io.in(newRoomId).emit('playerJoined', profile)
      currentRoomId = newRoomId;
    })

    socket.on('sendMessage', (msg) => {
      runInRoom((roomId) => {
        io.in(roomId).emit('newMessage', profile, msg)
      })
    })
  })
  return io;
}

export default createServer

