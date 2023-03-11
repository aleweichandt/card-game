import React, {useEffect} from "react";
import {useRouter} from "next/router";
import ChatView from "@/components/ChatView";

type Props = {}

const RoomScreen: React.FC<Props> = () => {
  const router = useRouter()
  const { roomId } = router.query;
  return (
    <main>
      <section>
        <header>Room {roomId}</header>
      </section>
      <aside>
        {roomId && <ChatView roomId={roomId as string}/>}
      </aside>
    </main>
  )
}

export default RoomScreen
