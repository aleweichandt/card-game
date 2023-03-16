import {io} from "socket.io-client";
import {GameSocket} from "@/modules/app/model/types";
import {Profile} from "@/modules/session/model/types";

export const init = async (cleanUp: boolean = false): Promise<GameSocket> => {
  await fetch('/api/socket')
  const gameSocket: GameSocket =  io({ autoConnect: false });
  // connect if credentials
  if(!cleanUp) {
    await connect(gameSocket)
  }
  return gameSocket;
}

export const connect = async (gameSocket: GameSocket, profile?: Profile) => {
  let prf = profile
  if(!prf) {
    const profileItem = await sessionStorage.getItem('profile');
    if(profileItem) {
      prf = JSON.parse(profileItem);
    }
  }
  if(prf) {
    gameSocket.auth = {profile: prf};
    gameSocket.connect()
    sessionStorage.setItem('profile', JSON.stringify(prf))
  }
}
