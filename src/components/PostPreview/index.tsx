import IPost from "../../interfaces/post";
import LgDefault from "./LgDefault";
import SmDefault from "./SmDefault";

function PostPreview({ post, size = "lg" }: { post: IPost, size?: "lg" | "sm" }) {

    // TODO get style from settings

    if (size === "sm") {
        return <SmDefault post={post} />
    }

    return <LgDefault post={post} />
}

export default PostPreview