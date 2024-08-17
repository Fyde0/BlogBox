import { Col, Image, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import IPost from "../../interfaces/post";

function SmDefault({ post }: { post: IPost }) {

    const now = new Date()

    let shortAuthorString = "Posted by " + post.author.username
    let shortDateFormat: Intl.DateTimeFormatOptions = { month: "short", day: "numeric" }

    if (post.createdAt) {
        const createdAtDate = new Date(post.createdAt)
        // only show year if different than current
        if (now.getFullYear() !== createdAtDate.getFullYear()) {
            shortDateFormat.year = "numeric"
        }
        shortAuthorString += " on " + createdAtDate.toLocaleString(undefined, shortDateFormat)
    }
    if (post.updatedAt && post.createdAt !== post.updatedAt) {
        shortAuthorString += "*"
    }

    let longAuthorString = "Posted by " + post.author.username
    let longDateFormat: Intl.DateTimeFormatOptions = { month: "long", day: "numeric" }

    if (post.createdAt) {
        const createdAtDate = new Date(post.createdAt)
        // only show year if different than current
        if (now.getFullYear() !== createdAtDate.getFullYear()) {
            longDateFormat.year = "numeric"
        }
        longAuthorString += " on " + createdAtDate.toLocaleString(undefined, longDateFormat)
    }
    if (post.updatedAt && post.createdAt !== post.updatedAt) {
        const updatedAtDate = new Date(post.updatedAt)
        if (now.getFullYear() !== updatedAtDate.getFullYear()) {
            longDateFormat.year = "numeric"
        }
        longAuthorString += " (Updated " + updatedAtDate.toLocaleString(undefined, longDateFormat) + ")"
    }

    return (
        <Row className="g-3">
            {post.picture &&
                <Col sm="auto" className="d-flex align-items-center overflow-hidden">
                    <Image
                        width="100px"
                        height="100px"
                        src={import.meta.env.VITE_API_URL + "/thumbs/" + post.picture}
                        className="border object-fit-cover"
                    />
                </Col>
            }
            <Col className="d-flex flex-column justify-content-center">
                <Link to={"/" + post.postId}>
                    <h6 className="mb-1">{post.title}</h6>
                </Link>
                <small>{shortAuthorString}</small>
            </Col>
        </Row>
    )
}

export default SmDefault