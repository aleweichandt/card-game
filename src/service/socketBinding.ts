import {SocketBinding as SOB} from "@/modules/core/model/socketApi";
import {
  ClientToServerEvents,
  InterServerEvents,
  ServerToClientEvents,
  SocketData,
  SocketLocal
} from "@/service/types";
import {socketBinding as sessionBindings} from "@/modules/session/api/socketBinding";
import {socketBinding as chatBindings} from "@/modules/chat/api/socketBinding";

export type SocketBinding = SOB<ClientToServerEvents, ServerToClientEvents, InterServerEvents, SocketData, SocketLocal>

export const socketBinding: SocketBinding = (
  socket, io
) => {
  sessionBindings(socket, io)
  chatBindings(socket, io)
}
