import React, { createContext, FC, ReactNode, useEffect, useMemo } from "react"
import { initialize, LDClient, LDFlagSet } from "launchdarkly-js-client-sdk"

import { LDData, LDUser } from "../types"

import { camelCaseKeys } from "../lib/utils"

interface Props {
  initialLDData: LDData
  clientId: string
  children: ReactNode
}

export interface Context {
  isBot: boolean
  flags?: LDFlagSet
  user?: LDUser
}

const LDContext = createContext<Context>(null)

const LDProvider: FC<Props> = ({ initialLDData, clientId, children }) => {
  // persists the data initialized server-side on the client
  const ldData = useMemo(() => initialLDData, [])
  const { user, isBot, initializeClient = true, allFlags = {} } = ldData || {}

  useEffect(() => {
    // only enable client-side instrumentation for non-bots to prevent unnecessary MAU
    if (!isBot && initializeClient) {
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
