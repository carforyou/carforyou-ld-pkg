import { useContext } from "react"
import { context } from "../context/index"

export const useLDClient = () => {
  const { ldClient } = useContext(context)

  return ldClient
}

export const useFlags = () => {
  const { flags } = useContext(context)

  return flags
}
