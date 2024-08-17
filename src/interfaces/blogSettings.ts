import { postPreviewLgStyle } from "../components/PostPreview/interfaces/postPreview"

interface IBlogSettings {
    title: string
    theme: "minty" | "flatly" | "cosmo" // TODO use type for themes
    homeLayout: {
        postPreviewStyle: postPreviewLgStyle
        featuredPosts: boolean
        featuredPostsTags: string[]
        introCard: boolean
        introCardTitle: string
        introCardContent: string
    }
}

export const defaultBlogSettings: IBlogSettings = {
    title: "BlogBox",
    theme: "minty",
    homeLayout: {
        postPreviewStyle: "LgDefault",
        featuredPosts: false,
        featuredPostsTags: [],
        introCard: false,
        introCardTitle: "",
        introCardContent: ""
    }
}

export function isIBlogSettings(obj: IBlogSettings): obj is IBlogSettings {

    if (!obj.homeLayout || !obj.homeLayout.postPreviewStyle ||
        typeof obj.homeLayout.featuredPosts !== "boolean" ||
        !obj.homeLayout.featuredPostsTags ||
        typeof obj.homeLayout.introCard !== "boolean"
    ) {
        return false
    }
    if (!obj.title || !obj.theme) {
        return false
    }
    return true

}

export default IBlogSettings