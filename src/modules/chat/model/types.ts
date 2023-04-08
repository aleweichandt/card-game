import {Socket as IOSocket} from 'socket.io-client'
import {ServerToClientEvents, ClientToServerEvents} from "@/modules/chat/api/types";

export type ChatSocket = IOSocket<ServerToClientEvents, ClientToServerEvents>;

export type Message = string;

