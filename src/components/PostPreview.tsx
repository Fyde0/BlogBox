import { Card } from "react-bootstrap";
import IPost from "../interfaces/post";
import { Link } from "react-router-dom";

function PostPreview({ post }: { post: IPost }) {
    let authorString = "Posted by " + post.author.username
    if (post.createdAt) {
        authorString += " on " + new Date(post.createdAt).toLocaleString(undefined, { dateStyle: "long", timeStyle: "short" })
    }
    if (post.updatedAt && post.createdAt !== post.updatedAt) {
        authorString += " (Updated " + new Date(post.updatedAt).toLocaleString(undefined, { dateStyle: "long", timeStyle: "short" }) + ")"
    }

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
                <Card.Subtitle className="text-body-secondary">
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

export default PostPreview