import {GameSocket} from "@/modules/app/model/types";
import {getProfile} from "@/modules/session/model/profileRepository";

export const connect = async (gameSocket: GameSocket) => {
  const profile = getProfile()
  if (profile) {
    gameSocket.auth = {profile: profile};
    gameSocket.connect()
  }
}
