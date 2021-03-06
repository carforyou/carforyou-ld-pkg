import { useContext } from "react"

import { LDContext } from "../context/index"

export const useFlags = () => {
  const data = useContext(LDContext)
  return data && data.flags ? data.flags : {}
}
