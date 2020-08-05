import React, { ReactNode, FC, createContext, useEffect, useMemo } from "react"
import { initialize, LDFlagSet, LDClient } from "launchdarkly-js-client-sdk"
import { LDData, LDUser } from "../types"

import { camelCaseKeys } from "../lib/utils"

interface Props {
  initialLDData: LDData
  clientId: string
  children: ReactNode
}

export interface Context {
  flags?: LDFlagSet
  user?: LDUser
  isBot: boolean
}

const LDContext = createContext<Context>()

const LDProvider: FC<Props> = ({ initialLDData, clientId, children }) => {
  // persists the data initialized server-side on the client
  const ldData = useMemo(() => initialLDData, [])
  const { user, isBot, allFlags } = ldData

  useEffect(() => {
    // only enable client-side instrumentation for non-bots to prevent unnecessary MAU
    if (!isBot) {
      const client: LDClient = initialize(clientId, user)
      client.on("ready", () => {
        // forces sending analytics events used for client-side experiments
        client.allFlags()
      })
    }
  }, [])

  const flags = camelCaseKeys(allFlags)
  return (
    <LDContext.Provider value={{ flags, user, isBot }}>
      {children}
    </LDContext.Provider>
  )
}

export { LDContext, LDProvider }
