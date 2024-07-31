import { Col, Container, Row } from "react-bootstrap"
// 
import Loading from "../components/Loading"
import PostPreview from "../components/PostPreview"
import ErrorPage from "../components/errors/ErrorPage"
import FetchError from "../api/FetchError"
import { getPostsQuery } from "../api/posts"

export function Component() {

    const getPosts = getPostsQuery({ page: 1 })

    if (getPosts.isFetching) {
        return <Loading />
    }

    if (getPosts.isError || !getPosts.data) {
        if (getPosts.error instanceof FetchError) {
            return <ErrorPage code={getPosts.error?.response.status} />
        } else {
            throw getPosts.error
        }
    }

    const posts = getPosts.data

    if (posts.length === 0) {
        return (
            <Container className="text-center">There are no posts yet.</Container>
        )
    }

    return (
        <Row>
            <Col lg="8">
                {
                    posts.map((post, i) => {
                        return (
                            <Container key={i} className="mb-3">
                                <PostPreview post={post} />
                            </Container>
                        )
                    })
                }
            </Col>
            <Col>
                Side bar
            </Col>
        </Row>
    )
}