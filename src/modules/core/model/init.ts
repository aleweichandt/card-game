import {io, Socket} from "socket.io-client";

export const init = async (): Promise<Socket> => {
  // @ts-ignore
  return io(process.env.BASE_URL, {
    autoConnect: false,
    path: "/api/socket",
  });
}
