import {GameSocket} from "@/modules/app/model/types";
import {getProfile} from "@/modules/session/model/profileRepository";
import {init} from "@/modules/core/model/init";

export const connect = async () => {
  const gameSocket = await init() as GameSocket
  const profile = getProfile()
  if (profile) {
    gameSocket.auth = {profile: profile};
    gameSocket.connect()
  }
  return gameSocket
}
