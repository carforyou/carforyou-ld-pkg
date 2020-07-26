export interface LDUser {
  key: string
  email?: string
  anonymous?: boolean
}

export interface LDData {
  visitorId: string
  user: LDUser
}
