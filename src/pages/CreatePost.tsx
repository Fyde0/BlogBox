import { Navigate } from "react-router-dom"
import { submitPostMutation } from "../api/posts"
import PostEditor from "../components/PostEditor"
import { FetchError } from "../api/FetchLib"
import { Alert, Container } from "react-bootstrap"

export function Component() {

    const submitPost = submitPostMutation({ updating: false })

    if (submitPost.isSuccess) {
        return (
            <Navigate to={"/" + (submitPost.data)} />
        )
    }

    if (submitPost.isError && !(submitPost.error instanceof FetchError)) {
        throw submitPost.error
    }

    return (
        <Container className="m-auto d-flex flex-column gap-4">

            {/* Error */}
            {submitPost.isError && <Alert variant="danger" className="align-self-center">{submitPost.error.message}</Alert>}

            <PostEditor submitPost={submitPost.mutate} isPending={submitPost.isPending} />

        </Container>
    )

}