import React from "react"
import { initialize } from "launchdarkly-js-client-sdk"
import { render } from "@testing-library/react"

import { LDProvider } from ".."

describe("launch darkly provider", () => {
  const clientIdMock = "dummyId"
  const userMock = { key: "dummy" }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it("initializes the client for non bot users", () => {
    render(
      <LDProvider
        clientId={clientIdMock}
        initialLDData={{
          user: userMock,
          allFlags: {},
          isBot: false,
        }}
      >
        <div />
      </LDProvider>
    )

    expect(initialize).toHaveBeenCalledTimes(1)
  })

  it("does not initialize the client for bots", () => {
    render(
      <LDProvider
        clientId={clientIdMock}
        initialLDData={{
          user: userMock,
          allFlags: {},
          isBot: true,
        }}
      >
        <div />
      </LDProvider>
    )

    expect(initialize).toHaveBeenCalledTimes(0)
  })

  it("initializes the client when initializeClient flag is true", () => {
    render(
      <LDProvider
        clientId={clientIdMock}
        initialLDData={{
          user: userMock,
          allFlags: {},
          isBot: false,
          initializeClient: true,
        }}
      >
        <div />
      </LDProvider>
    )

    expect(initialize).toHaveBeenCalledTimes(1)
  })

  it("does not initialize the client when initializeClient flag is false", () => {
    render(
      <LDProvider
        clientId={clientIdMock}
        initialLDData={{
          user: userMock,
          allFlags: {},
          isBot: false,
          initializeClient: false,
        }}
      >
        <div />
      </LDProvider>
    )

    expect(initialize).toHaveBeenCalledTimes(0)
  })
})
