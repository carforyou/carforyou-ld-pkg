import { useContext } from "react"
import { LDContext } from "../context/index"

// export const useLDClient = () => {
//   const { ldClient } = useContext(LDContext)

//   return ldClient
// }

export const useFlags = () => {
  const ctx = useContext(LDContext)
  console.log("ctx useflags", ctx)
  const { flags } = ctx

  return flags
}
