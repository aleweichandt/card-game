import React from "react";
import {useRouter} from "next/router";
import JoinForm from "@/modules/session/view/JoinForm";
import ScreenLayout from "@/modules/core/view/ScreenLayout";

type Props = {}

const HomeScreen: React.FC<Props> = () => {
  const router = useRouter()
  const {room: roomId} = router.query;
  const onSubmit = async () => {
    await router.push(`/room/${roomId}`)
  }
  return (
    <ScreenLayout header="Before you join the room...">
      <article>
        <JoinForm onSubmit={onSubmit}/>
      </article>
    </ScreenLayout>
  )
}

export default HomeScreen
