import { useContext } from "react"
import { LDContext } from "../context/index"

export const useFlags = () => {
  const { flags } = useContext(LDContext)
  return flags
}
