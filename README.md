# CAR FOR YOU LaunchDarkly

[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)

## Usage
```
npm install @carforyou/ld
```

Example

```
import { Provider } from "@carforyou/ld"

...

<Provider ldClientId={LAUNCH_DARKLY_ID} ldUser={ldUser} flags={flags}>
    <Components />
</Provider>

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

```
npm run release
```
