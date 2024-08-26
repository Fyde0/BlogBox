import { Card, Col } from "react-bootstrap";
import IPost from "../../interfaces/post";
import { Link } from "react-router-dom";
import getPostPreview from "./helpers/getPostPreview";

function LgCardNoThumb({ post }: { post: IPost }) {

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
        <Col md="6">
            <Card>
                <Card.Header>
                    <Card.Title>
                        <Link to={"/" + post.postId}>
                            <h5>{post.title}</h5>
                        </Link>
                    </Card.Title>
                    <Card.Subtitle className="text-body-secondary">
                        <small>{authorString}</small>
                    </Card.Subtitle>
                </Card.Header>
                {firstP &&
                    <Card.Body>
                        <Card.Text
                            dangerouslySetInnerHTML={{ __html: firstP?.innerHTML }}
                            // see src/assets/scss/custom.scss
                            className="post-preview-3-lines"
                        />
                    </Card.Body>
                }
            </Card>
        </Col>
    )
}

export default LgCardNoThumb