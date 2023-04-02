import {Socket as IOSocket} from 'socket.io-client'
import {ClientToServerEvents, ServerToClientEvents} from "@/modules/service/types";

export type GameSocket = IOSocket<ServerToClientEvents, ClientToServerEvents>;




