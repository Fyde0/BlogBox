import { Card, Col, Row, Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import IPost from "../../interfaces/post";
import getPostPreview from "./helpers/getPostPreview";

function LgCardHoriz({ post }: { post: IPost }) {

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
            <Card className="overflow-hidden">
                <Row className="g-0">
                    <Col xs="auto" className="d-none d-lg-block overflow-hidden">
                        {post.picture &&
                            <Image
                                className="object-fit-cover h-100"
                                src={import.meta.env.VITE_API_URL + "/thumbs/" + post.picture}
                            />}
                    </Col>
                    <Col>
                        <Card.Header>
                            <Card.Title>
                                <Link to={"/" + post.postId}>
                                    <h4>{post.title}</h4>
                                </Link>
                            </Card.Title>
                            <Card.Subtitle className="text-body-secondary">
                                <small>{authorString}</small>
                            </Card.Subtitle>
                        </Card.Header>
                        {
                            firstP &&
                            <Card.Body>
                                <Card.Text
                                    dangerouslySetInnerHTML={{ __html: firstP?.innerHTML }}
                                    // see src/assets/scss/custom.scss
                                    className="post-preview-card post-preview-4-lines"
                                />
                            </Card.Body>
                        }
                    </Col>
                </Row>
            </Card>
        </Col>
    )
}

export default LgCardHoriz