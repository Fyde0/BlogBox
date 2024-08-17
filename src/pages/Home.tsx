import { useParams } from "react-router-dom"
import { Col, Row } from "react-bootstrap"
// 
import Sidebar from "../components/Sidebar"
import Loading from "../components/Loading"
import PostsList from "../components/PostsList"
import ErrorPage from "../components/errors/ErrorPage"
import { FetchError } from "../api/FetchLib"
import { getAllPostsQuery } from "../api/posts"
import useUserStore from "../stores/user"
import PostPreview from "../components/PostPreview"
import { useBlogSettings } from "../api/blogSettings"
import Intro from "../components/Sidebar/Intro"

export function Component() {
    const { page } = useParams()
    const { userSettings } = useUserStore()
    const blogSettings = useBlogSettings()

    let currentPage = Number(page)

    if (!page || currentPage < 1) currentPage = 1

    const getPosts = getAllPostsQuery({ page: currentPage, postsPerPage: userSettings.postsPerPage })
    const getFeaturedPosts = getAllPostsQuery({ page: 1, postsPerPage: 2, tags: blogSettings.data?.homeLayout.featuredPostsTags })

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

    const featuredPosts = getFeaturedPosts.data?.posts

    return (
        <div className="d-flex flex-column gap-5">
            {
                blogSettings.data?.homeLayout.featuredPosts &&
                featuredPosts && featuredPosts?.length > 0 && !getFeaturedPosts.isError &&

                <Row className="gy-3 align-items-center justify-content-center">
                    {featuredPosts[0] &&
                        <Col md={6} xs={12}>
                            <PostPreview post={featuredPosts[0]} styleOverride="LgCardHoriz" />
                        </Col>
                    }
                    {featuredPosts[1] &&
                        <Col md={6} xs={12}>
                            <PostPreview post={featuredPosts[1]} styleOverride="LgCardHoriz" />
                        </Col>
                    }
                </Row>
            }
            <Row className="gy-3">
                <Col md="8" className="d-flex flex-column justify-content-start gap-3">
                    <PostsList posts={posts} totalPosts={postsCount} currentPage={currentPage} />
                </Col>
                <Col>
                    <Sidebar>
                        {blogSettings.data?.homeLayout.introCard && <Intro />}
                    </Sidebar>
                </Col>
            </Row>
        </div>
    )
}