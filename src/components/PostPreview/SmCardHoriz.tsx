import { Card, Col, Image, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import IPost from "../../interfaces/post";
import config from "../../config/config";

function SmCardHoriz({ post }: { post: IPost }) {

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
        <Card className="overflow-hidden">
            <Row className="g-0">
                <Col sm="3" className="d-flex align-items-center">
                    {post.picture &&
                        <Image
                            fluid
                            src={config.api.url + "/thumbs/" + post.picture}
                        />}
                </Col>
                <Col className="d-flex align-items-center">
                    <Card.Body>
                        <Card.Title>
                            <Link to={"/" + post.postId}>
                                <h6>{post.title}</h6>
                            </Link>
                        </Card.Title>
                        <Card.Subtitle title={longAuthorString}>
                            <small>{shortAuthorString}</small>
                        </Card.Subtitle>
                    </Card.Body>
                </Col>
            </Row>
        </Card>
    )
}

export default SmCardHoriz