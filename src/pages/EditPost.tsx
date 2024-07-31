import { useParams } from "react-router-dom"
// 
import Loading from "../components/Loading"
import ErrorPage from "../components/errors/ErrorPage"
import PostEditor from "../components/editor/PostEditor"
import { getPostByPostIdQuery } from "../api/posts"
import { FetchError } from "../api/FetchLib"
import useUserStore from "../stores/user"

export function Component() {
    const { userInfo } = useUserStore()
    const { year, month, day, titleId } = useParams()

    const postId = year + "/" + month + "/" + day + "/" + titleId
    const getPost = getPostByPostIdQuery({ postId: postId })

    // isFetching is for initial load and also refetching
    if (getPost.isFetching) {
        return <Loading />
    }

    if (getPost.isError || !getPost.data) {
        if (getPost.error instanceof FetchError) {
            return <ErrorPage code={getPost.error?.response.status} />
        } else {
            throw getPost.error
        }
    }

    // Only the owner can edit the post
    if (getPost.data.author._id !== userInfo._id) {
        return <ErrorPage code={403} />
    }

    return (
        <PostEditor postToUpdate={getPost.data} />
    )

}