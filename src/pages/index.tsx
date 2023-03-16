import React from "react";
import {useRouter} from "next/router";
import JoinForm from "@/modules/session/view/JoinForm";
import ScreenLayout from "@/modules/core/view/ScreenLayout";

type Props = {}

const HomeScreen: React.FC<Props> = () => {
  const router = useRouter()
  const onSubmit = async (_: string) => {
    await router.push(`/room/abc`)
  }
  return (
    <ScreenLayout header="Welcome!">
      <article>
        <JoinForm onSubmit={onSubmit} />
      </article>
    </ScreenLayout>
  )
}

export default HomeScreen
