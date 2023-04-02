import {
  ClientToServerEvents,
  InterServerEvents,
  ServerToClientEvents,
  SocketData
} from "@/modules/chat/api/types";
import {SocketBinding as SOB} from "@/modules/core/model/socketApi";
import {SocketLocal as SessionLocal} from "@/modules/session/api/types";

export type SocketBinding = SOB<ClientToServerEvents, ServerToClientEvents, InterServerEvents, SocketData, SessionLocal>

export const socketBinding: SocketBinding = (
  socket, io
) => {
  socket.on('sendMessage', (msg) => {
    socket.runInRoom((roomId) => {
      io.in(roomId).emit('newMessage', socket.profile, msg)
    })
  })
}
