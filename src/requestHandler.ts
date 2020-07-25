import { uuid } from "uuidv4"
import LaunchDarkly, { LDClient } from "launchdarkly-node-server-sdk"
import { Application } from "express"

const createLDClient = async (sdkKey): Promise<LDClient> => {
  const ldClient = LaunchDarkly.init(sdkKey)
  return ldClient.waitForInitialization()
}

const getLDClient = async (
  app: Application,
  sdkKey: string
): Promise<LDClient> => {
  const existingLDClient = app.get("LDClient")
  if (existingLDClient) {
    return existingLDClient
  }

  const newLDClient = await createLDClient(sdkKey)
  app.set("LDClient", newLDClient)
  return newLDClient
}

const isBot = (headers) => {
  const botList = [
    "GrapeshotCrawler",
    "bingbot",
    "adsbot",
    "Mediapartners-Google",
    "Googlebot",
    "MJ12bot",
    "SemrushBot",
    "TTD-Content",
    "YandexBot",
    "facebookexternalhit",
    "SearchmetricsBot",
    "Pingdom.com",
    "Opebot",
    "proximic",
  ]
  const userAgent = headers["user-agent"]
  if (userAgent) {
    return !!botList.find((botUserAgent) => userAgent.match(botUserAgent))
  }

  return true
}

// todo: allow to pass visitorid / user key from the app
const getVisitorId = (cookie) => {
  const regex = /cfyuuid4=(?<visitorId>.*)cfyuuid4;/
  const result = regex.exec(cookie)
  return result ? result.groups.visitorId : uuid()
}

const getLDRequestHandler = (sdkKey) => {
  return async (req, res, next) => {
    const { app, url, query, headers } = req
    if (!sdkKey) {
      // eslint-disable-next-line no-console
      console.warn(
        "No sdkKey passed to LDRequestHandler, will not load the feature flags form the launch darkly API"
      )
      return next()
    }

    if ([/^\/_next/, /^\/static/].find((matcher) => url.match(matcher))) {
      return next()
    }

    // load flag data for the current visitor from launch darkly api
    const ldClient = await getLDClient(app, sdkKey)
    const visitorId =
      query.visitorId || (isBot(headers) ? "bot" : getVisitorId(headers.cookie))

    const user = { key: visitorId, anonymous: true } // todo, don't hardcode this
    const allFlags = await ldClient.allFlagsState(user)

    const data = {
      user,
      allFlags: allFlags.toJSON(),
    }

    req.ldData = data

    // todo: move to project
    res.cookie("cfyuuid4", `${visitorId}cfyuuid4`, {
      maxAge: 2592000000, // 30 days
      httpOnly: false,
    })

    next()
  }
}

export default getLDRequestHandler
