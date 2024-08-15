import IUserSettings from "./userSettings";

// not using this, just here to match with the server
interface IUser {
    _id?: string
    username: string
    password: string
    settings: IUserSettings
    admin: boolean
    avatar?: string
    name?: string
    about?: string
}

export type IUserInfo = Omit<IUser, "password" | "settings" | "admin">

export const emptyUserInfo: IUserInfo = {
    username: "",
}

export const placeholderUserInfo: IUserInfo = {
    username: "username"
}

export function isIUserInfo(obj: IUserInfo): obj is IUserInfo {
    return obj.username ? true : false
}