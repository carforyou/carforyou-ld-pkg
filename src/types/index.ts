import { LDFlagSet } from "launchdarkly-node-server-sdk"

export interface LDUser {
  key: string
  email?: string
  anonymous?: boolean
}

export interface LDData {
  user: LDUser
  allFlags: LDFlagSet
  isBot: boolean
  initializeClient?: boolean
}
