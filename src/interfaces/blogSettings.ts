import { postPreviewLgStyle } from "../components/PostPreview/interfaces/postPreview"

interface IBlogSettings {
    title: string
    theme: "minty" | "flatly" | "cosmo"
    homeLayout: {
        postPreviewStyle: postPreviewLgStyle
    }
}

export const defaultBlogSettings: IBlogSettings = {
    title: "BlogBox",
    theme: "minty",
    homeLayout: {
        postPreviewStyle: "LgDefault"
    }
}

export function isIBlogSettings(obj: IBlogSettings): obj is IBlogSettings {

    if (!obj.homeLayout || !obj.homeLayout.postPreviewStyle) {
        return false
    }
    if (!obj.title || !obj.theme) {
        return false
    }
    return true

}

export default IBlogSettings