import { Container } from "react-bootstrap";
// 
import PostPreview from "./PostPreview";
import IPost from "../interfaces/post";

function PostsList({ title, posts }: { title?: string, posts: IPost[] }) {

    const titleElement = title && <Container><h1>{title}</h1></Container>

    if (posts.length === 0) {
        return (
            <Container className="d-flex flex-column justify-content-start gap-3 p-0">
                {titleElement}
                <Container>There are no posts here.</Container>
            </Container>
        )
    }

    return (
        <Container className="d-flex flex-column justify-content-start gap-3 p-0">
            {titleElement}
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