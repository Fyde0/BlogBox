import IUserSettings from "./userSettings";

// not using this, just here to match with the server
interface IUser {
    _id?: string
    username: string
    password: string
    settings: IUserSettings
    admin: boolean
    avatar?: string | File
    name?: string
    about?: string
}

export type IUserInfo = Omit<IUser, "password" | "settings">

export const emptyUserInfo: IUserInfo = {
    username: "",
    admin: false,
}

export function isIUserInfo(obj: IUserInfo): obj is IUserInfo {
    return obj.username && obj.admin !== undefined ? true : false
}