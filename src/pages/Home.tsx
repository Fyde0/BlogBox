import { useParams } from "react-router-dom"
import { Col, Row } from "react-bootstrap"
// 
import Sidebar from "../components/Sidebar"
import Loading from "../components/Loading"
import PostsList from "../components/PostsList"
import ErrorPage from "../components/errors/ErrorPage"
import { FetchError } from "../api/FetchLib"
import { getAllPostsQuery } from "../api/posts"

export function Component() {
    const { page } = useParams()

    let currentPage = Number(page)

    if (!page || currentPage < 1) currentPage = 1

    const getPosts = getAllPostsQuery({ page: currentPage })

    if (getPosts.isFetching) {
        return <Loading />
    }

    if (getPosts.isError) {
        if (getPosts.error instanceof FetchError) {
            return <ErrorPage code={getPosts.error?.response.status} />
        } else {
            throw getPosts.error
        }
    }

    const posts = getPosts.data?.posts
    const postsCount = getPosts.data?.totalCount

    return (
        <Row className="gy-3">
            <Col md="8" className="d-flex flex-column justify-content-start gap-3">
                <PostsList posts={posts} totalPosts={postsCount} currentPage={currentPage} />
            </Col>
            <Col>
                <Sidebar host="home" />
            </Col>
        </Row>
    )
}