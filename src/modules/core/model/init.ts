import {io, Socket as IOSocket} from "socket.io-client";

export const init = async <STC extends object, CTS extends object>(): Promise<IOSocket<STC, CTS>> => {
  // @ts-ignore
  return io(process.env.BASE_URL, {
    autoConnect: false,
    path: "/api/socket",
  });
}
