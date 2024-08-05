import IPost from "../../interfaces/post";
import LgDefaultNoThumb from "./LgDefaultNoThumb";
import SmDefaultNoThumb from "./SmDefaultNoThumb";

function PostPreview({ post, size = "lg" }: { post: IPost, size?: "lg" | "sm" }) {

    // TODO get style from settings

    if (size === "sm") {
        return <SmDefaultNoThumb post={post} />
    }

    return <LgDefaultNoThumb post={post} />
}

export default PostPreview