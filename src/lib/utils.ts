import camelCase from "lodash.camelcase"
import { LDFlagSet } from "launchdarkly-js-client-sdk"

export const camelCaseKeys = (rawFlags: LDFlagSet) => {
  const flags: LDFlagSet = {}
  for (const rawFlag in rawFlags) {
    if (!rawFlag.startsWith("$")) {
      flags[camelCase(rawFlag)] = rawFlags[rawFlag]
    }
  }

  return flags
}
