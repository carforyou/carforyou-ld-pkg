import React, { FC, createContext, useState, useEffect } from "react"
import camelCase from "lodash.camelcase"
import {
  LDClient,
  LDFlagSet,
  LDFlagChangeset,
  initialize as ldClientInitialize
} from "launchdarkly-js-client-sdk"
import { LDUser } from "../types/ldUser"

import { camelCaseKeys } from "../lib/utils"

export interface LDContext {
  flags: LDFlagSet
  ldClient?: LDClient
}

export const context = createContext<LDContext>({
  flags: {},
  ldClient: undefined
})
const { Provider, Consumer } = context

interface ProviderProps {
  flags?: LDFlagSet
  ldClientId: string
  ldUser: LDUser
}

const initLDClient = (
  clientSideID: string,
  ldUser: LDUser,
  flags: LDFlagSet
): LDClient => {
  return flags
    ? ldClientInitialize(clientSideID, ldUser, { bootstrap: flags })
    : ldClientInitialize(clientSideID, ldUser)
}

const ProviderWithState: FC<ProviderProps> = ({
  flags,
  ldClientId,
  ldUser,
  children
}) => {
  const [ldClient, setLdClient] = useState<LDContext>()

  useEffect(() => {
    if (ldUser) {
      const client = initLDClient(ldClientId, ldUser, flags)
      client.on("initialized", () => {
        setLdClient(client)
      })
    }
  }, [ldClientId, ldUser?.key])

  const allFlags = ldClient ? ldClient.allFlags() : flags

  return (
    <Provider
      value={{
        ldClient,
        flags: camelCaseKeys(allFlags)
      }}
    >
      {children}
    </Provider>
  )
}

export { Consumer, ProviderWithState as Provider }
