import { Navigate, useParams } from "react-router-dom"
// 
import Loading from "../components/Loading"
import ErrorPage from "../components/errors/ErrorPage"
import PostEditor from "../components/PostEditor"
import { getPostByPostIdQuery, submitPostMutation } from "../api/posts"
import { FetchError } from "../api/FetchLib"
import useUserStore from "../stores/user"
import { Alert, Container } from "react-bootstrap"

export function Component() {
    const { userInfo } = useUserStore()
    const { year, month, day, titleId } = useParams()

    // API calls setup

    const postId = year + "/" + month + "/" + day + "/" + titleId
    const getPost = getPostByPostIdQuery({ postId: postId })

    const submitPost = submitPostMutation({ updating: true })

    // API result checks

    if (submitPost.isSuccess) {
        return (
            <Navigate to={"/" + (submitPost.data)} />
        )
    }

    if (submitPost.isError && !(submitPost.error instanceof FetchError)) {
        throw submitPost.error
    }

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
        <Container className="m-auto d-flex flex-column gap-4">

            {/* Error */}
            {submitPost.isError && <Alert variant="danger" className="align-self-center">{submitPost.error.message}</Alert>}

            <PostEditor postToEdit={getPost.data} submitPost={submitPost.mutate} isPending={submitPost.isPending} />

        </Container>
    )

}