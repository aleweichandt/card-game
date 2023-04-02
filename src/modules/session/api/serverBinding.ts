import {
  ClientToServerEvents,
  InterServerEvents,
  ServerToClientEvents,
  SocketData,
} from "@/modules/session/api/types";
import {log} from "@/modules/session/api/log";
import {ServerBinding as SEB} from "@/modules/core/model/socketApi";

export type ServerBinding = SEB<ClientToServerEvents, ServerToClientEvents, InterServerEvents, SocketData>

export const serverBinding: ServerBinding = (
  io
) => {
  io.use((socket, next) => {
    const {profile} = socket.handshake.auth;
    log('authWith', profile)
    if (!profile) {
      log('auth error')
      return next(new Error("invalid username"));
    }
    // @ts-ignore
    socket.profile = profile;
    next();
  });
}

