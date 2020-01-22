import { LDUser } from "./ldUser"

export interface LDData {
  user: LDUser
  allFlags: { [key: string]: string }
}
