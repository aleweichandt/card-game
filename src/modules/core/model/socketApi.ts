import {Server as IOServer, Socket as IOSocket} from "socket.io";

export type ServerBinding<
  ListenEvents extends object,
  EmitEvents extends object,
  ServerSideEvents extends object,
  SocketData extends object,
> = (
  io: IOServer<ListenEvents, EmitEvents, ServerSideEvents, SocketData>
) => void;

export type SocketBinding<
  ListenEvents extends object,
  EmitEvents extends object,
  ServerSideEvents extends object,
  SocketData extends object,
  SocketLocal extends object | void = void,
> = (
  socket: IOSocket<ListenEvents, EmitEvents, ServerSideEvents, SocketData> & SocketLocal,
  io: IOServer<ListenEvents, EmitEvents, ServerSideEvents, SocketData>
) => void
