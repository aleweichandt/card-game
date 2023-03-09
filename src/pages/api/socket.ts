import createServer from "@/service/server";
import {NextApiRequest} from "next";
import {NextApiResponseServerIO} from "@/service/types";

const socketHandler = async (
    req: NextApiRequest,
    res: NextApiResponseServerIO,
  ) => {
    if (!res.socket?.server.io) {
      res.socket.server.io = createServer(res.socket.server, {
        cors: {
          origin: "http://localhost:3000",
        }
      })
    } else {
      console.log('--Server:', 'service already running')
    }
    res.end()
  }
;

export const config = {
  api: {
    bodyParser: false,
  },
}
export default socketHandler
