import { Card, Col, Container, Row } from "react-bootstrap"
// 
import Sidebar from "../components/Sidebar"
import Loading from "../components/Loading"
import PostsList from "../components/PostsList"
import ErrorPage from "../components/errors/ErrorPage"
import { FetchError } from "../api/FetchLib"
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
                <PostsList posts={posts} />
            </Col>
            <Col className="d-flex flex-column gap-3">
                <Card>
                    <Card.Body>
                        <Card.Title>Welcome</Card.Title>
                        <Card.Text>
                            TODO Write something here
                        </Card.Text>
                    </Card.Body>
                </Card>
                <Sidebar />
            </Col>
        </Row>
    )
}