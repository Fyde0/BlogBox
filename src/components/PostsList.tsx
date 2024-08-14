import { Container, Row } from "react-bootstrap";
// 
import PostPreview from "./PostPreview";
import Paginator from "./Paginator";
import IPost from "../interfaces/post";

function PostsList({ title, posts, currentPage, totalPosts }: { title?: string, posts?: IPost[], currentPage: number, totalPosts?: number }) {

    const titleElement = title && <Container><h1>{title}</h1></Container>

    if (!posts || posts.length === 0) {
        return (
            <div className="d-flex flex-column justify-content-start gap-3">
                {titleElement}
                <Container>There are no posts here.</Container>
            </div>
        )
    }

    return (
        <Row className="g-3">
            {titleElement}
            {
                posts.map((post, i) => {
                    return (
                        <PostPreview post={post} key={i} />
                    )
                })
            }
            <Paginator totalPosts={totalPosts} currentPage={currentPage} />
        </Row>
    )
}

export default PostsList