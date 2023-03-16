import React from "react";
import {useRouter} from "next/router";
import ChatView from "@/modules/chat/view/ChatView";
import ScreenLayout from "@/modules/core/view/ScreenLayout";

type Props = {}

const RoomScreen: React.FC<Props> = () => {
  const router = useRouter()
  const { roomId } = router.query;
  return (
    <ScreenLayout header={`Room ${roomId}`}>
      <aside>
        {roomId && <ChatView roomId={roomId as string}/>}
      </aside>
    </ScreenLayout>
  )
}

export default RoomScreen
