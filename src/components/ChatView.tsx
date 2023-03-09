import React, {FormEventHandler, useRef, useState} from "react";
import useAsyncEffect from "@/components/useAsyncEffect";
import {init} from "@/client/gameSocket";
import {GameSocket} from "@/service/types";

type Props = {}

let socket: GameSocket | undefined
const ChatView: React.FC<Props> = () => {
  const [messages, setMessages] = useState<string[]>([])
  let sendMessage = useRef<(msg: string) => void>(() => {}).current
  const inputRef = useRef<HTMLInputElement>(null)
  const onSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault()
    const message = inputRef?.current?.value
    if (!!message && message.length > 0) {
      socket?.emit('sendMessage', message)
      inputRef.current.value = ''
    }
  }

  useAsyncEffect(async () => {
    socket = await init()
    socket.on('newMessage', (from, message) => {
      const newMessage = `${from.name}: ${message}`;
      setMessages( all => [...all, newMessage])
    })
  }, [])

  return (
    <div>
      <ul>
        {messages.map((msg, i) => (
          <li key={i}>{msg}</li>
        ))}
      </ul>
      <form onSubmit={onSubmit}>
        <input ref={inputRef} type="text" autoComplete="false" name="username"/>
        <div>
          <button type="submit">Send</button>
        </div>
      </form>
    </div>
  )
}

export default ChatView
