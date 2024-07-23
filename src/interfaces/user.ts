interface IUser {
    _id?: string
    username: string
    password: string
    admin: boolean
}

// User without password for UserStore
export type IUserInfo = Omit<IUser, "password">

// "Interface predicament"
export function isUserInfo(obj: IUserInfo): obj is IUserInfo {
    return obj.username && obj.admin !== undefined ? true : false
}

export default IUser