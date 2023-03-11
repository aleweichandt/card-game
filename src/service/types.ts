import {Server} from "http";
import {Server as IOServer} from "socket.io";
import {Socket as IOSocket} from 'socket.io-client'
import {NextApiResponse} from "next";
import {Socket} from "net";
import roomId from "@/pages/room/[roomId]";

export type NextApiResponseServerIO = NextApiResponse & {
  socket: Socket & {
    server: Server & {
      io: IOServer;
    };
  };
};

export interface ServerToClientEvents {
  newMessage: (from: Profile, message: string) => void;
  playerJoined: (profile: Profile) => void;
  playerLeft: (profile: Profile) => void;
}

export interface ClientToServerEvents {
  sendMessage: (msg: string) => void;
  joinRoom: (newRoomId: string) => void;
}

export interface InterServerEvents {
}

export interface SocketData {
}

export type GameServer = IOServer<ClientToServerEvents, ServerToClientEvents, InterServerEvents, SocketData>;
export type GameSocket = IOSocket<ServerToClientEvents, ClientToServerEvents>;
export interface Profile {
  id: string;
  name: string;
}




