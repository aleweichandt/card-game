import * as ChatApi from '@/modules/chat/model/socketApi'
import * as CoreApi from '@/modules/session/model/socketApi'

export type ServerToClientEvents = ChatApi.ServerToClientEvents & CoreApi.ServerToClientEvents

export type ClientToServerEvents = ChatApi.ClientToServerEvents & CoreApi.ClientToServerEvents

export type InterServerEvents =  ChatApi.InterServerEvents & CoreApi.InterServerEvents

export type SocketData =  ChatApi.SocketData & CoreApi.SocketData

