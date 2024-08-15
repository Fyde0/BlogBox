interface IBlogSettings {
    title: string
    theme: "minty" | "flatly" | "cosmo"
}

export const defaultBlogSettings: IBlogSettings = {
    title: "BlogBox",
    theme: "minty"
}

export function isIBlogSettings(obj: IBlogSettings): obj is IBlogSettings {
    return obj.title && obj.theme ? true : false
}

export default IBlogSettings