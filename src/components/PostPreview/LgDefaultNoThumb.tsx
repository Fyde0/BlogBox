import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import IPost from "../../interfaces/post";

function LgDefaultNoThumb({ post }: { post: IPost }) {

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
        <Card>
            <Card.Header>
                <Card.Title>
                    <Link to={"/" + post.postId}>
                        {post.title}
                    </Link>
                </Card.Title>
                <Card.Subtitle 
                className="text-body-secondary"
                style={{fontSize: "90%"}}
                >
                    {authorString}
                </Card.Subtitle>
            </Card.Header>
            {
                firstP &&
                <Card.Body>
                    <Card.Text
                        dangerouslySetInnerHTML={{ __html: firstP?.innerHTML }}
                        // see assets/scss/style.scss
                        className="post-preview"
                    />
                </Card.Body>
            }
        </Card>
    )
}

export default LgDefaultNoThumb