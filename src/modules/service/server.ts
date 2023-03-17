import {Server as IOServer, ServerOptions} from "socket.io";
import {
  GameServer,
} from "@/modules/app/model/types";
import {
  ClientToServerEvents,
  InterServerEvents,
  ServerToClientEvents,
  SocketData
} from "@/modules/app/model/socketApi";
import {Server} from "http";
import {Profile} from "@/modules/session/model/types";
import logger from "@/modules/core/model/logger";

const debugLog = logger('--Server:')

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
      // Skip if joining back to same room
      if(currentRoomId === newRoomId) {
        return;
      }
      // Leave previous room
      runInRoom((roomId) => {
        socket.in(roomId).emit('playerLeft', profile)
        socket.leave(roomId);
      })
      // Join new room
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

