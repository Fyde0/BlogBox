import { Card, Col } from "react-bootstrap";
import IPost from "../../interfaces/post";
import config from "../../config/config";

function LgCard({ post }: { post: IPost }) {

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
    const parser = new DOMParser()
    const doc = parser.parseFromString(post.content, 'text/html')
    const firstP = doc.querySelector('p')

    return (
        <Col md="6">
            <Card>
                {post.picture && <Card.Img variant="top" src={config.api.url + "/thumbs/" + post.picture} />}
                <Card.Body>
                    <Card.Title><h5>{post.title}</h5></Card.Title>
                    <Card.Subtitle className="text-body-secondary">
                        <p><small>{authorString}</small></p>
                    </Card.Subtitle>
                    {firstP &&
                        <Card.Text
                            dangerouslySetInnerHTML={{ __html: firstP?.innerHTML }}
                            // see src/assets/scss/custom.scss
                            className="post-preview-lg-no-thumb"
                        />
                    }
                </Card.Body>
            </Card>
        </Col>
    )
}

export default LgCard