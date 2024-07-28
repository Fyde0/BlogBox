import { Card } from "react-bootstrap";
import IPost from "../interfaces/post";
import { Link } from "react-router-dom";

function PostPreview({ post }: { post: IPost }) {
    let authorString = "Posted by " + post.author.username
    if (post.createdAt) {
        authorString += " on " + new Date(post.createdAt).toLocaleString()
    }

    return (
        <Card>
            <Card.Body>
                <Card.Title>
                    <Link to={"/" + post.postId}>
                        {post.title}
                    </Link>
                </Card.Title>
                <Card.Text>
                    {authorString}
                </Card.Text>
            </Card.Body>
        </Card>
    )
}

export default PostPreview