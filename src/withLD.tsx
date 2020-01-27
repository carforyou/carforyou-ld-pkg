import React from "react"
import hoistNonReactStatics from "hoist-non-react-statics"
import { LDClient, LDFlagSet } from "launchdarkly-js-client-sdk"

import { Consumer, LDContext } from "./context/index"
export interface WithLDProps {
  flags?: LDFlagSet
  ldClient: LDClient
}

export function withLD<P>(
  WrappedComponent: React.ComponentType<P & WithLDProps>
) {
  const withConsumer = (props: P) => (
    <Consumer>
      {({ flags, ldClient }: LDContext) => {
        return <WrappedComponent flags={flags} ldClient={ldClient} {...props} />
      }}
    </Consumer>
  )
  hoistNonReactStatics(withConsumer, WrappedComponent)
  return withConsumer
}
