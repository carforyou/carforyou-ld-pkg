# CAR FOR YOU LaunchDarkly SSR

[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)

Server-side launchdarkly feature flags for nextjs with client-side experimentation and insights. Detects known bots and excludes them from cient-side instrumentation, while still including them in server-side feature flags.

## Usage
```
npm install @carforyou/ld
```

Include the express middleware in your custom server to fetch flags server-side. Pass a function `getLDUser` in which you return the LD user object. For example, you could read the user id from an auth token and pass it as the key or generate uuids for public users.
```
import { getLDRequestHandler } from "@carforyou/ld"

const getLDUser = (req, res, isBot) => ({ key: "user@example.com", anonymous: false })
const ldRequestHandler = getLDRequestHandler(LAUNCH_DARKLY_SDK_KEY, getLDUser)

const server = express()
server.use(ldRequestHandler)
      .use(nextHandler)
      .listen()
```

In `_app`, pass `req.ldData` to the LDProvider. Feature flags are statically available accross requests and page transitions.
```
import { LDProvider } from "@carforyou/ld"

static async getInitialProps({ req }) {
  return { ldData: req.ldData }
}

render() {
  <LDProvider ldClientId={LAUNCH_DARKLY_ID} initialLDData={ldData}>
    ...
  </LDProvider>
}
```

Then in your components
```
import React from "react"
import { useFlags } from "@carforyou/ld"

const AppHead: FC = () => {
  const flags = useFlags()
  return flags.exampleFlag ? "on" : "off"
}
```

Alternatively, you can also use the context and get hold of some additional information
```
import React, { useContext } from "react"
import { LDContext } from "@carforyou/ld"

const AppHead: FC = () => {
  const { flags, user, isBot } = useContext()
}
```

## Development
```
npm run build
```

You can link a locally built package to integrate it with any project during development:

```
npm link ../carforyou-ld-pkg/pkg
```

## Release a new version
New versions are released on the ci using semantic-release as soon as you merge into master. Please
make sure your merge commit message adheres to the corresponding conventions.
