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
  const [state, setState] = useState<LDContext>({ flags, ldClient: undefined })

  useEffect(() => {
    if (ldUser) {
      const ldClient = initLDClient(ldClientId, ldUser, flags)
      ldClient.on("initialized", () => {
        if (!flags) {
          setState({ ldClient, flags: ldClient.allFlags() })
        } else {
          setState({ ldClient })
        }
      })

      ldClient.on("change", (changes: LDFlagChangeset) => {
        const flattened: LDFlagSet = {}
        for (const key in changes) {
          if (changes.hasOwnProperty(key)) {
            const flagKey = camelCase(key)
            flattened[flagKey] = changes[key].current
          }
        }

        const mergedFlags = { ...state.flags, ...flattened }
        setState({
          flags: mergedFlags
        })
      })
    }
  }, [ldClientId, ldUser.email])
  return (
    <Provider value={{ ...state, flags: camelCaseKeys(state.flags) }}>
      {children}
    </Provider>
  )
}

export { Consumer, ProviderWithState as Provider }
