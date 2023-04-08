import {Socket as IOSocket} from 'socket.io-client'
import {getProfile} from "@/modules/session/model/profileRepository";
import {init} from "@/modules/core/model/init";

export const connect = async <STC extends object, CTS extends object>(): Promise<IOSocket<STC, CTS>> => {
  const gameSocket = await init<STC, CTS>()
  const profile = getProfile()
  if (profile) {
    gameSocket.auth = {profile: profile};
    gameSocket.connect()
  }
  return gameSocket
}
