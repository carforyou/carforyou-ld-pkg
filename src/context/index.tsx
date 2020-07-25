import React, { ReactNode, FC, createContext, useState, useEffect, useMemo } from "react"
import {
  LDClient,
  LDFlagSet,
  initialize as ldClientInitialize,
} from "launchdarkly-js-client-sdk"
import { LDUser } from "../types/ldUser"

import { camelCaseKeys } from "../lib/utils"

interface Props {
  initialLDData: LDData
  children: ReactNode
}

export interface LDData {
  visitorId: string
  user: LDUser
}

export interface Context {
  flags?: LDFlagSet
  visitorId?: string
}

const LDContext = createContext<Context>()

const LDProvider: FC<Props> = ({ initialLDData, children }) => {
  const ldData = useMemo(() => initialLDData, []) // persists the data initialized server-side on the client
  console.log("provider", {initialLDData, ldData})

  const flags = camelCaseKeys(ldData.allFlags)
  const visitorId = ldData.user?.key

  return (
    <LDContext.Provider value={{ flags, visitorId }}>
      {children}
    </LDContext.Provider>
  )
}

export { LDContext, LDProvider }

// const initLDClient = (
//   clientSideID: string,
//   user: LDUser,
//   flags: LDFlagSet
// ): LDClient => {
//   return flags
//     ? ldClientInitialize(clientSideID, user, { bootstrap: flags })
//     : ldClientInitialize(clientSideID, user)
// }

// const ProviderWithState: FC<ProviderProps> = ({
//   ldClientId,
//   initialLDData,
//   children,
// }) => {
//   const [ldClient, setLdClient] = useState<LDContext>()
//   const ldData = useMemo(() => initialLDData, []) // persists the data initialized server-side on the client
//   console.log("provider", {initialLDData, ldData})

//   // if (ldData) {
//   //   const client = initLDClient(ldClientId, user, flags)
//   //   client.on("initialized", () => {
//   //     setLdClient(client)
//   //   })
//   // }

//   // const allFlags = ldClient ? ldClient.allFlags() : flags

//   return (
//     <Provider
//       value={{
//         // ldClient,
//         visitiordId: "oooo"+ldData.visitorId,
//         flags: camelCaseKeys(ldData.flags),
//       }}
//     >
//       {children}
//     </Provider>
//   )
// }

// export { Consumer, ProviderWithState as Provider }
