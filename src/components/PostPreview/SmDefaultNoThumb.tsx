import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import IPost from "../../interfaces/post";

function LgDefaultNoThumb({ post }: { post: IPost }) {
    let authorString = "Posted by " + post.author.username

    return (
        <Card>
            <Card.Body>
                <Card.Title>
                    <Link to={"/" + post.postId}>
                        {post.title}
                    </Link>
                </Card.Title>
                <Card.Subtitle>
                    {authorString}
                </Card.Subtitle>
            </Card.Body>
        </Card>
    )
}

export default LgDefaultNoThumb