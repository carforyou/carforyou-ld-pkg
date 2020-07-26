import React, { ReactNode, FC, createContext, useEffect, useMemo } from "react"
import LDClient, { LDFlagSet } from "launchdarkly-js-client-sdk"
import { LDData } from "../types"


import { camelCaseKeys } from "../lib/utils"

interface Props {
  initialLDData: LDData
  clientId: string
  children: ReactNode
}

export interface Context {
  flags?: LDFlagSet
  user?: string
}

const LDContext = createContext<Context>()

const LDProvider: FC<Props> = ({ initialLDData, clientId, children }) => {
  // persists the data initialized server-side on the client
  const ldData = useMemo(() => initialLDData, [])
  const user = ldData.user

  useEffect(() => {
    // only enable client-side instrumentation when a user is passed
    if (Object.keys(user).length) {
      const client = LDClient.initialize(clientId, ldData.user)
      client.on("ready", () => {
        // forces sending analytics events used for client-side experiments
        client.allFlags()
      })
    }
  }, [])

  const flags = camelCaseKeys(ldData.allFlags)

  return (
    <LDContext.Provider value={{ flags, user }}>{children}</LDContext.Provider>
  )
}

export { LDContext, LDProvider }
