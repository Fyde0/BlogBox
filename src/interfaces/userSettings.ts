interface IUserSettings {
    postsPerPage: number
    theme: "dark" | "light"
}

export const defaultUserSettings: IUserSettings = {
    postsPerPage: 10,
    theme: "dark"
}

export function isIUserSettings(obj: IUserSettings): obj is IUserSettings {
    return typeof obj.postsPerPage === "number" && obj.theme ? true : false
}

export default IUserSettings