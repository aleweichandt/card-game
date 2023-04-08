import {Profile} from "@/modules/session/model/types";
import {Message} from "@/modules/chat/model/types";
import {ServerToClientEvents as SessionSTC} from '@/modules/session/api/types'

export type ServerToClientEvents = {
  newMessage: (from: Profile, message: Message) => void;
} & SessionSTC

export type ClientToServerEvents = {
  sendMessage: (msg: Message) => void;
  joinRoom: (newRoomId: string) => void;
}

export type InterServerEvents = {}

export type SocketData = {}
