import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import IPost from "../../interfaces/post";

function LgDefaultNoThumb({ post }: { post: IPost }) {

    const now = new Date()

    let authorString = "Posted by " + post.author.username
    let dateFormat: Intl.DateTimeFormatOptions = { month: "short", day: "numeric" }

    if (post.createdAt) {
        const createdAtDate = new Date(post.createdAt)
        // only show year if different than current
        if (now.getFullYear() !== createdAtDate.getFullYear()) {
            dateFormat.year = "numeric"
        }
        authorString += " on " + createdAtDate.toLocaleString(undefined, dateFormat)
    }
    if (post.updatedAt && post.createdAt !== post.updatedAt) {
        authorString += "*"
    }

    return (
        <Card>
            <Card.Body>
                <Card.Title>
                    <Link to={"/" + post.postId}>
                        {post.title}
                    </Link>
                </Card.Title>
                <Card.Subtitle style={{fontSize: "90%"}}>
                    {authorString}
                </Card.Subtitle>
            </Card.Body>
        </Card>
    )
}

export default LgDefaultNoThumb