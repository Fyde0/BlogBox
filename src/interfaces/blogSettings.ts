interface IBlogSettings {
    theme: "minty" | "flatly" | "cosmo"
}

export const defaultBlogSettings: IBlogSettings = {
    theme: "minty",
}

export function isIBlogSettings(obj: IBlogSettings): obj is IBlogSettings {
    return obj.theme ? true : false
}

export default IBlogSettings