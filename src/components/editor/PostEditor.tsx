import { useState } from "react"
import { Navigate } from "react-router-dom"
import { Alert, Button, Container, Form, Spinner, ToggleButton } from "react-bootstrap"
// 
import RTEditor from "./RTEditor"
import { submitPostMutation } from "../../api/posts"
import FetchError from "../../api/FetchError"
import IPost, { emptyPost } from "../../interfaces/post"

function PostEditor({ postToUpdate }: { postToUpdate?: IPost }) {
    // if postToUpdate exists, we're in "update mode"
    const [post, setPost] = useState<IPost>(postToUpdate ? postToUpdate : emptyPost)
    const [showPreview, setShowPreview] = useState<boolean>(false)

    // API calls setup

    const submitPost = submitPostMutation({ updating: postToUpdate ? true : false })

    // API result checks

    if (submitPost.isSuccess) {
        return (
            <Navigate to={"/" + (submitPost.data)} />
        )
    }

    if (submitPost.isError && !(submitPost.error instanceof FetchError)) {
        throw submitPost.error
    }

    // TODO Validate post

    return (
        <Container
            className="m-auto d-flex flex-column justify-content-center gap-4"
            style={{ maxWidth: "900px" }}
        >

            {/* Error */}
            {submitPost.isError && <Alert variant="danger" className="align-self-center">{submitPost.error.message}</Alert>}

            {/* Title */}
            <Container>
                <Form.Label className="w-100">
                    <h3>Title</h3>
                    <Form.Control
                        value={post.title}
                        onChange={(e) => {
                            const newTitle = e.currentTarget.value
                            setPost((prevPost: IPost) => ({
                                ...prevPost,
                                title: newTitle
                            }))
                        }}
                    />
                </Form.Label>
            </Container>

            {/* Editor */}
            <RTEditor post={post} setPost={setPost} />

            {/* Buttons */}
            <Container className="d-flex gap-2 justify-content-end">

                <ToggleButton
                    id="preview" value="Preview"
                    type="checkbox" variant="secondary"
                    checked={showPreview}
                    onChange={(e) => setShowPreview(e.currentTarget.checked)}
                >
                    Preview
                </ToggleButton>

                <Button
                    variant="primary"
                    onClick={() => submitPost.mutate(post)}
                    disabled={submitPost.isPending}
                >
                    {submitPost.isPending ?
                        <Spinner animation="border" role="status" size="sm">
                            <span className="visually-hidden">Loading...</span>
                        </Spinner>
                        :
                        <span>{postToUpdate ? "Update" : "Post"}</span>
                    }
                </Button>

            </Container>

            {/* Post preview */}
            {/* TODO Make preview with sidebar? Use ViewPost? */}
            {
                showPreview &&
                <Container style={{ maxWidth: "800px" }}>
                    {post.title && <span><h3 className="mb-3">{post.title}</h3><hr /></span>}
                    <Container dangerouslySetInnerHTML={{ __html: post.content }} />
                </Container>
            }

        </Container >
    )
}

export default PostEditor