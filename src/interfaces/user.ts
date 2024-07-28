interface IUser {
    _id?: string
    username: string
    password: string
    admin: boolean
}

// User without password for UserStore and for displaying
export type IUserInfo = Omit<IUser, "password">

export const emptyUserInfo: IUserInfo = {
    username: "",
    admin: false
}

// "Interface predicament"
export function isIUserInfo(obj: IUserInfo): obj is IUserInfo {
    return obj.username && obj.admin !== undefined ? true : false
}

export default IUser