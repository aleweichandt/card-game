import React, {useEffect, useState} from "react";
import {useRouter} from "next/router";
import ChatView from "@/components/ChatView";

type InitFn = (
  roomId: string,
) => Promise<void>;

type Props = {
  init: InitFn
}

const Home: React.FC<Props> = ({init}) => {
  const router = useRouter();
  const {roomId} = router.query
  const [messages] = useState<string[]>([])
  useEffect(() => {
    if(typeof roomId === 'string') {
      init(roomId)
    }
  }, [roomId])
  return <div>
    <h1>Room {roomId}</h1>
    <ChatView messages={messages} onNewMessage={() => {}}/>
  </div>;
}

export default Home;
