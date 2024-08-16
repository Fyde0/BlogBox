import { postPreviewLgStyle } from "../components/PostPreview/interfaces/postPreview"

interface IBlogSettings {
    title: string
    theme: "minty" | "flatly" | "cosmo"
    homeLayout: {
        postPreviewStyle: postPreviewLgStyle
        featuredPosts: boolean
        featuredPostsTags: string[]
    }
}

export const defaultBlogSettings: IBlogSettings = {
    title: "BlogBox",
    theme: "minty",
    homeLayout: {
        postPreviewStyle: "LgDefault",
        featuredPosts: false,
        featuredPostsTags: []
    }
}

export function isIBlogSettings(obj: IBlogSettings): obj is IBlogSettings {

    if (!obj.homeLayout || !obj.homeLayout.postPreviewStyle ||
        typeof obj.homeLayout.featuredPosts !== "boolean" ||
        !obj.homeLayout.featuredPostsTags
    ) {
        return false
    }
    if (!obj.title || !obj.theme) {
        return false
    }
    return true

}

export default IBlogSettings