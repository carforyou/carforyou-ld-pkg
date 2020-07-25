import React from "react"
import hoistNonReactStatics from "hoist-non-react-statics"
import { LDClient, LDFlagSet } from "launchdarkly-js-client-sdk"

import { LDContext, Context } from "./context/index"
export interface WithLDProps {
  flags?: LDFlagSet
  ldClient?: LDClient
}

export function withLD<P>(
  WrappedComponent: React.ComponentType<P & WithLDProps>
) {
  const withConsumer = (props: P) => (
    <LDContext.Consumer>
      {({ flags, visitorId }: Context) => {
        return <WrappedComponent flags={flags} visitorId={visitorId} {...props} />
      }}
    </LDContext.Consumer>
  )
  hoistNonReactStatics(withConsumer, WrappedComponent)
  return withConsumer
}
