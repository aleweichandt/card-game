import {Profile} from "@/modules/session/model/types";

export type ServerToClientEvents = {
  playerJoined: (profile: Profile) => void;
  playerLeft: (profile: Profile) => void;
}

export type ClientToServerEvents = {
  joinRoom: (newRoomId: string) => void;
}

export type InterServerEvents = {}

export type SocketData = {}
