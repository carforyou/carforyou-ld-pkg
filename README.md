# CAR FOR YOU Example

[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)

## Usage
```
npm install @carforyou/example
```

## Development
```
npm run build
```

You can link your local npm package to integrate it with any local project:
```
cd carforyou-example-pkg
npm run build

cd carforyou-listings-web
npm link ../carforyou-example-pkg/pkg
```

## Release a new version

Releasing is done using semantic release on the ci after merging into the default branch.


## Circle CI

You will need to enable the repository in circle CI ui to be able to build it.

For slack notifications to work you will need to provide the token in circle settings.
