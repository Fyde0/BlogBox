import { useParams } from "react-router-dom"
import { Card, Col, Row } from "react-bootstrap"
// 
import Sidebar from "../components/Sidebar"
import Loading from "../components/Loading"
import PostsList from "../components/PostsList"
import ErrorPage from "../components/errors/ErrorPage"
import Paginator from "../components/Paginator"
import { FetchError } from "../api/FetchLib"
import { getAllPostsQuery } from "../api/posts"

export function Component() {
    const { page } = useParams()

    let currentPage = Number(page)

    if (!page) currentPage = 1

    const getPosts = getAllPostsQuery({ page: currentPage })

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

    const posts = getPosts.data.posts
    const postsCount = getPosts.data.totalCount
    const postsPerPage = 10
    const pages = Math.ceil(postsCount / postsPerPage)

    return (
        <Row>
            <Col lg="8" className="d-flex flex-column justify-content-center gap-3">
                <PostsList posts={posts} />
                <Paginator totalPages={pages} currentPage={currentPage} />
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