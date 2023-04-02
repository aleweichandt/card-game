import {
  ClientToServerEvents,
  InterServerEvents,
  ServerToClientEvents,
  SocketData,
  SocketLocal
} from "@/modules/session/api/types";
import {SocketBinding as SOB} from "@/modules/core/model/socketApi";

export type SocketBinding = SOB<ClientToServerEvents, ServerToClientEvents, InterServerEvents, SocketData, SocketLocal>

export const socketBinding: SocketBinding = (
  socket, io
) => {
  let currentRoomId: string | undefined;
  socket.runInRoom = (fn: (roomId: string) => void) => {
    if (currentRoomId) {
      fn(currentRoomId)
    }
  }
  socket.on('disconnect', () => {
    socket.runInRoom((roomId) => {
      socket.in(roomId).emit('playerLeft', socket.profile)
      currentRoomId = undefined;
    })
  })

  socket.on('joinRoom', (newRoomId) => {
    // Skip if joining back to same room
    if (currentRoomId === newRoomId) {
      return;
    }
    // Leave previous room
    socket.runInRoom((roomId) => {
      socket.in(roomId).emit('playerLeft', socket.profile)
      socket.leave(roomId);
    })
    // Join new room
    socket.join(newRoomId);
    io.in(newRoomId).emit('playerJoined', socket.profile)
    currentRoomId = newRoomId;
  })
}
