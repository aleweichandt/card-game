import {Profile} from "@/modules/session/model/types";
import {Message} from "@/modules/chat/model/types";

export type ServerToClientEvents = {
  newMessage: (from: Profile, message: Message) => void;
  playerJoined: (profile: Profile) => void;
  playerLeft: (profile: Profile) => void;
}

export type ClientToServerEvents = {
  sendMessage: (msg: Message) => void;
  joinRoom: (newRoomId: string) => void;
}

export type InterServerEvents = {}

export type SocketData = {}
