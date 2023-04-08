import {ServerBinding as SEB} from "@/modules/core/model/socketApi";
import {ClientToServerEvents, InterServerEvents, ServerToClientEvents, SocketData} from "@/service/types";
import {serverBinding as sessionBinding} from "@/modules/session/api/serverBinding";

export type ServerBinding = SEB<ClientToServerEvents, ServerToClientEvents, InterServerEvents, SocketData>

export const serverBinding: ServerBinding = (
  server
) => {
  sessionBinding(server)
}
