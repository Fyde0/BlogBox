import { Col, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
// 
import Sidebar from "../components/Sidebar";
import ErrorPage from "../components/errors/ErrorPage";
import Loading from "../components/Loading";
import PostsList from "../components/PostsList";
import { getAllPostsQuery } from "../api/posts";
import { FetchError } from "../api/FetchLib";
import useUserStore from "../stores/user";

export function Component() {
    const { tag, page } = useParams()
    const { userSettings } = useUserStore()

    let currentPage = Number(page)
    if (!page) currentPage = 1

    let tags: string[] = []
    if (tag) {
        tags.push(tag)
    }

    const getPosts = getAllPostsQuery({
        page: currentPage,
        postsPerPage: userSettings.postsPerPage,
        tags
    })

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

    return (
        // gutter (margin) between columns (for small screens)
        <Row className="gy-3">
            <Col md="8" className="d-flex flex-column justify-content-start gap-3">
                <PostsList
                    title={"Tag: #" + tag}
                    posts={posts}
                    totalPosts={postsCount}
                    currentPage={currentPage}
                />
            </Col>
            <Col>
                <Sidebar />
            </Col>
        </Row>
    )

}