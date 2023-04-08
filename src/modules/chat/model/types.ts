import {Socket as IOSocket} from 'socket.io-client'
import {ServerToClientEvents} from "@/modules/chat/api/types";
import {ClientToServerEvents} from "@/modules/service/types";

export type ChatSocket = IOSocket<ServerToClientEvents, ClientToServerEvents>;

export type Message = string;

