import { User } from "./user"

export interface Data {
  user: User
  allFlags: { [key: string]: string }
}
