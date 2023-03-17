import React, {FormEventHandler, useRef} from "react";
import {createProfile} from "@/modules/session/model/profileRepository";

type Props = {
  onSubmit: () => Promise<void>;
}

const JoinForm: React.FC<Props> = ({ onSubmit: submit }) => {
  const inputRef = useRef<HTMLInputElement>(null)
  const onSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault()
    const username = inputRef?.current?.value
    if (username && username.length > 0) {
      createProfile(username)
      await submit()
    }
  }

  return (
    <form onSubmit={onSubmit}>
      <input ref={inputRef} type="text" autoComplete="false" name="username"/>
      <div>
        <button type="submit">Create Room</button>
      </div>
    </form>
  )
}

export default JoinForm
