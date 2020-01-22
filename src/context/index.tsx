import React, { FC, createContext, useState, useEffect } from "react"
import camelCase from "lodash.camelcase"
import {
  LDClient,
  LDFlagSet,
  LDFlagChangeset,
  initialize as ldClientInitialize
} from "launchdarkly-js-client-sdk"
import { User } from "../types/user"

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
  ldUser: User
}

const initLDClient = (
  clientSideID: string,
  ldUser: User,
  flags: LDFlagSet
): LDClient => {
  return ldClientInitialize(clientSideID, ldUser, {
    bootstrap: flags
  })
}

const ProviderWithState: FC<ProviderProps> = ({
  flags = {},
  ldClientId,
  ldUser,
  children
}) => {
  const [state, setState] = useState<LDContext>({ flags, ldClient: undefined })

  useEffect(() => {
    ;(async () => {
      if (ldUser) {
        const ldClient = await initLDClient(ldClientId, ldUser, flags)
        setState({ ldClient, flags: camelCaseKeys(flags) })
      }
    })()
  }, [ldClientId, ldUser.email])

  useEffect(() => {
    const { ldClient } = state
    if (ldClient) {
      ldClient.on("change", (changes: LDFlagChangeset) => {
        const flattened: LDFlagSet = {}
        for (const key in changes) {
          if (changes.hasOwnProperty(key)) {
            const flagKey = camelCase(key)
            flattened[flagKey] = changes[key].current
          }
        }

        const mergedFlags = camelCaseKeys({ ...state.flags, ...flattened })
        setState({
          flags: mergedFlags,
          ldClient
        })
      })
    }
  }, [state.ldClient])
  return <Provider value={state}>{children}</Provider>
}

export { Consumer, ProviderWithState as Provider }
