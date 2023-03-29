import createServer from "@/modules/service/server";
import {NextApiRequest} from "next";
import {NextApiResponseServerIO} from "@/modules/app/model/types";

const socketHandler = async (
    req: NextApiRequest,
    res: NextApiResponseServerIO,
  ) => {
    if (!res.socket?.server.io) {
      res.socket.server.io = createServer(res.socket.server, {
        path: "/api/socket",
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
