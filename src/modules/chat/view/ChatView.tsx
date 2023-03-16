import React, {FormEventHandler, useRef, useState} from "react";
import useAsyncEffect from "@/modules/core/view/hooks/useAsyncEffect";
import {init} from "@/modules/app/model/client";
import {GameSocket} from "@/modules/app/model/types";

type Props = {
  roomId: string;
}

let socket: GameSocket | undefined
const ChatView: React.FC<Props> = ({ roomId}) => {
  const [messages, setMessages] = useState<string[]>([])
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
    socket.on('playerJoined', (profile) => {
      const newMessage = `${profile.name} joined the room`;
      setMessages( all => [...all, newMessage])
    })
    socket.on('playerLeft', (profile) => {
      const newMessage = `${profile.name} left the room`;
      setMessages( all => [...all, newMessage])
    })
    socket.emit('joinRoom', roomId)
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
