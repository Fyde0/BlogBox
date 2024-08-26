import { Link } from "react-router-dom";
import IPost from "../../interfaces/post";
import { Col } from "react-bootstrap";
import getPostPreview from "./helpers/getPostPreview";

function LgDefault({ post }: { post: IPost }) {

    const now = new Date()

    let authorString = "Posted by " + post.author.username
    let dateFormat: Intl.DateTimeFormatOptions = { month: "long", day: "numeric" }

    if (post.createdAt) {
        const createdAtDate = new Date(post.createdAt)
        // only show year if different than current
        if (now.getFullYear() !== createdAtDate.getFullYear()) {
            dateFormat.year = "numeric"
        }
        authorString += " on " + createdAtDate.toLocaleString(undefined, dateFormat)
    }
    if (post.updatedAt && post.createdAt !== post.updatedAt) {
        const updatedAtDate = new Date(post.updatedAt)
        if (now.getFullYear() !== updatedAtDate.getFullYear()) {
            dateFormat.year = "numeric"
        }
        authorString += " (Updated " + updatedAtDate.toLocaleString(undefined, dateFormat) + ")"
    }

    // get first paragraph of post to show in preview
    const firstP = getPostPreview(post.content)

    return (
        <Col sm="12">
            {/* position-relative is for text's ::after */}
            <div className="position-relative">
                <Link to={"/" + post.postId}>
                    <h2 className="mb-0">{post.title}</h2>
                </Link>
                <p className="opacity-75">{authorString}</p>
                {
                    firstP &&
                    <p
                        dangerouslySetInnerHTML={{ __html: firstP?.innerHTML }}
                        // see src/assets/scss/custom.scss
                        className="post-preview-5-lines post-preview-lg-default"
                    />
                }
            </div>
        </Col>
    )
}

export default LgDefault