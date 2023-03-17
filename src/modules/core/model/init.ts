import {io, Socket} from "socket.io-client";

export const init = async (
  socketUrl: string = '/api/socket',
): Promise<Socket> => {
  await fetch(socketUrl)
  return io({
    autoConnect: false,
    path: "/api/socketio",
  });
}
