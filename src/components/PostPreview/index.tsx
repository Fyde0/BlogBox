import { useBlogSettings } from "../../api/blogSettings";
import IPost from "../../interfaces/post";
import { postPreviewComponents, postPreviewAllStyle } from "./interfaces/postPreview";
import LgDefault from "./LgDefault";
import SmDefault from "./SmDefault";

function PostPreview({ post, size = "lg", styleOverride }:
    {
        post: IPost,
        size?: "lg" | "sm",
        styleOverride?: postPreviewAllStyle
    }) {

    const blogSettings = useBlogSettings()

    // default return
    let Component: React.FC<{ post: IPost }> = LgDefault

    // override
    if (styleOverride) {
        Component = postPreviewComponents[styleOverride]
        return <Component post={post} />
    }

    // small
    if (size === "sm") {
        const smStyle = blogSettings.data?.sidebarLayout.postPreviewStyle
        if (smStyle) {
            Component = postPreviewComponents[smStyle]
        } else {
            // default small
            Component = SmDefault
        }
    }

    // large
    const lgStyle = blogSettings.data?.homeLayout.postPreviewStyle
    if (size === "lg" && lgStyle) {
        Component = postPreviewComponents[lgStyle]
    }

    return <Component post={post} />
}

export default PostPreview