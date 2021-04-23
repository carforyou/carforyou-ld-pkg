import React from "react"
import { render } from "@testing-library/react"
import { initialize } from "launchdarkly-js-client-sdk"
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
      />
    )

    expect(initialize).toBeCalledTimes(1)
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
      />
    )

    expect(initialize).toBeCalledTimes(0)
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
      />
    )

    expect(initialize).toBeCalledTimes(1)
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
      />
    )

    expect(initialize).toBeCalledTimes(0)
  })
})
