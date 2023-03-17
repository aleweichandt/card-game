import {io} from "socket.io-client";
import {GameSocket} from "@/modules/app/model/types";
import {connect} from "@/modules/session/model/connect";

export const init = async (cleanUp: boolean = false): Promise<GameSocket> => {
  await fetch('/api/socket')
  const gameSocket: GameSocket =  io({ autoConnect: false });
  // connect if credentials
  if(!cleanUp) {
    await connect(gameSocket)
  }
  return gameSocket;
}
