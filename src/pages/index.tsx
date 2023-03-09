import React, {FormEventHandler, useRef} from "react";
import {useRouter} from "next/router";

type Props = {}

const HomeScreen: React.FC<Props> = () => {
  const router = useRouter()
  const inputRef = useRef<HTMLInputElement>(null)
  const onSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault()
    const username = inputRef?.current?.value
    if (username && username.length > 0) {
      await router.push(`/room/abc`)
    }
  }
  return (
    <main>
      <section>
        <header>
          Welcome!
        </header>
        <article>
          <form onSubmit={onSubmit}>
            <input ref={inputRef} type="text" autoComplete="false" name="username"/>
            <div>
              <button type="submit">Create Room</button>
            </div>
          </form>
        </article>
      </section>
    </main>
  )
}

export default HomeScreen
