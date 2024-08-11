import { getAllPostsQuery } from "../../api/posts"
import Loading from "../Loading"
import PostPreview from "../PostPreview"

function LatestPosts({ count }: { count?: number }) {

    let postCount = 3
    if (count) { postCount = count }

    const postsQuery = getAllPostsQuery({ page: 1, postsPerPage: postCount })

    if (postsQuery.isFetching) {
        return <Loading />
    }

    if (postsQuery.error || !postsQuery.data || postsQuery.data.posts.length === 0) {
        return <></>
    }

    const posts = postsQuery.data.posts.slice(0, postCount)

    return (
        <div>
            <h5>Latest posts</h5>
            <div className="d-flex flex-column justify-content-start gap-2">
                {
                    posts.map((post, i) => {
                        return <PostPreview key={i} size="sm" post={post} />
                    })
                }
            </div>
        </div>
    )
}

export default LatestPosts