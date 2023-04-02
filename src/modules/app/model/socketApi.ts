import * as ChatApi from '@/modules/chat/api/types'
import * as SessionApi from '@/modules/session/api/types'

export type ServerToClientEvents = ChatApi.ServerToClientEvents & SessionApi.ServerToClientEvents

export type ClientToServerEvents = ChatApi.ClientToServerEvents & SessionApi.ClientToServerEvents

export type InterServerEvents = ChatApi.InterServerEvents & SessionApi.InterServerEvents

export type SocketData = ChatApi.SocketData & SessionApi.SocketData

export type SocketLocal = SessionApi.SocketLocal
