import { Container } from "react-bootstrap";
// 
import PostPreview from "./PostPreview";
import IPost from "../interfaces/post";

function PostsList({ title, posts }: { title?: string, posts: IPost[] }) {
    return (
        <Container className="d-flex flex-column justify-content-start gap-3 p-0">
            {
                title &&
                <Container>
                    <h1>{title}</h1>
                </Container>
            }
            {
                posts.map((post, i) => {
                    return (
                        <Container key={i}>
                            <PostPreview post={post} />
                        </Container>
                    )
                })
            }
        </Container>
    )
}

export default PostsList