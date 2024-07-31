import { z } from "zod"

interface IUser {
    _id?: string
    username: string
    password: string
    admin: boolean
}

export const emptyUser: IUser = {
    username: "",
    password: "",
    admin: false
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

export function validateIUser(userInfo: IUser): boolean {
    const validationResult = z.object({
        username: z
            .string()
            .min(1, { message: "Username required." })
            .min(4, { message: "The username must be between 4 and 32 characters." })
            .max(32, { message: "The username must be between 4 and 32 characters." })
            .regex(/^([a-z0-9-_]+)$/, { message: "The username contains invalid characters." }),
        password: z
            .string()
            .min(1, { message: "Password required." })
            .min(4, { message: "The password must be between 4 and 50 characters." })
            .max(50, { message: "The password must be between 4 and 50 characters." }),
    })
        .safeParse({ username: userInfo.username, password: userInfo.password })

    if (!validationResult.success) {
        throw Error(validationResult.error.issues[0].message)
    }

    return true
}

export default IUser