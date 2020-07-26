# CAR FOR YOU LaunchDarkly SSR

[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)

Server-side launchdarkly feature flags for nextjs with client-side experimentation and insights. Detects known bots so you can choose to exclude them from instrumentation.

## Usage
```
npm install @carforyou/ld
```

Include the express middleware in your custom server to fetch flags server-side. Pass a function `getLDUser` in which you return the LD user object. For example, you could read the user id from an auth token and pass it as the key or generate uuids for public users.
```
import { ldMiddleware }

const getLDUser = (req, res, isBot) => ({ key: "example", anonymous: false })
const ldRequestHandler = ldMiddleware(LAUNCH_DARKLY_SDK_KEY, getLDUser)

const server = express()
server.use(ldRequestHandler).listen()
```

In `_app`, pass `req.ldData` to the LDProvider
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

## Development
```
npm run build
```

You can link your local npm package to integrate it with any local project:
```
npm run link -- <relative_path_to_project>
```
This ensures that projects react is linked back to build package and prevents errors due to duplicate react instances.

## Release a new version

New versions are released on the ci using semantic-release as soon as you merge into master. Please
make sure your merge commit message adheres to the corresponding conventions.
