import LaunchDarkly, { LDClient } from "launchdarkly-node-server-sdk"
import { Application, Request, Response } from "express"

import { LDUser, LDData } from "./types"

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

const matchesBotUserAgent = (headers) => {
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

type GetLDUser = ({
  req,
  res,
  isBot,
}: {
  req: Request
  res: Response
  isBot: boolean
}) => LDUser

const getLDRequestHandler = (sdkKey: string, getLDUser: GetLDUser) => {
  return async (req, res, next) => {
    const { app, path, headers } = req

    if (!sdkKey) {
      // eslint-disable-next-line no-console
      console.warn(
        "No sdkKey passed to LDRequestHandler, will not load the feature flags form the launch darkly API"
      )
      return next()
    }

    if ([/^\/_next/, /\.\w{1,4}$/].find((matcher) => path.match(matcher))) {
      return next()
    }

    const isBot = matchesBotUserAgent(headers)
    const user = getLDUser({ req, res, isBot })

    if (user) {
      const ldClient = await getLDClient(app, sdkKey)
      const allFlags = await ldClient.allFlagsState(user)

      const ldData: LDData = {
        user,
        allFlags: allFlags.toJSON(),
        isBot,
      }
      req.ldData = ldData
    }

    next()
  }
}

export default getLDRequestHandler
