import { LDUser } from "./ldUser"

export interface Data {
  user: LDUser
  allFlags: { [key: string]: string }
}
