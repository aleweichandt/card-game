import {Profile} from "@/modules/session/model/types";
import {v4 as uuid} from "uuid";

const PROFILE_KEY = 'session:profile'

export const setProfile = (profile: Profile) => {
  const serialisedProfile = JSON.stringify(profile)
  sessionStorage.setItem(PROFILE_KEY, serialisedProfile)
}

export const getProfile = (): Profile | undefined => {
  const serialisedProfile = sessionStorage.getItem(PROFILE_KEY)
  if(serialisedProfile) {
    return JSON.parse(serialisedProfile)
  }
}

export const createProfile = (name: string): Profile | undefined => {
  const profile: Profile = { id: uuid(), name }
  setProfile(profile)
  return profile
}
