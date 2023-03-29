import {io, Socket} from "socket.io-client";

export const init = async (
  socketUrl: string = '/api/socket',
): Promise<Socket> => {
  // await fetch(socketUrl)
  // @ts-ignore
  return io(process.env.BASE_URL, {
    autoConnect: false,
    path: "/api/socket",
  });
}
