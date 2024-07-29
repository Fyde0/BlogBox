import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Alert, Button, Container, Form, Spinner, ToggleButton } from "react-bootstrap"
import { useMutation } from "@tanstack/react-query"
import axios from "axios"
// 
import RTEditor from "./RTEditor"
import IPost, { emptyPost } from "../../interfaces/post"
import config from "../../config/config"

function PostEditor({ postToUpdate }: { postToUpdate?: IPost }) {
    const navigate = useNavigate()
    const [post, setPost] = useState<IPost>(postToUpdate ? postToUpdate : emptyPost)
    const [showPreview, setShowPreview] = useState<boolean>(false)
    const [error, setError] = useState<string>("")

    const submitPost = useMutation({
        mutationFn: async (updateMode: boolean) => {
            let endpoint = "/posts/create" // create new post
            if (updateMode) {
                endpoint = "/posts/update/" + post._id // update post
            }
            return await axios.post(
                config.api.url + endpoint,
                { ...post },
                { withCredentials: true }
            )
        },
        onSuccess: (data: any) => {
            const post = data.data
            navigate("/" + post.postId)
        },
        onError: (error: any) => {
            error.response
                ? setError(error.response.data)
                : setError("Something went wrong.")
        }
    })

    // TODO Validate post

    return (
        <Container
            className="m-auto d-flex flex-column justify-content-center gap-4"
            style={{ maxWidth: "900px" }}
        >

            {/* Error */}
            {error != "" && <Alert variant="danger" className="d-inline-block">{error}</Alert>}

            {/* Title */}
            <Container>
                <Form.Label className="w-100">
                    <h3>Title</h3>
                    <Form.Control
                        value={post.title}
                        onChange={(e) => {
                            const titleValue = e.currentTarget.value
                            setPost((prevPost: IPost) => ({
                                ...prevPost,
                                title: titleValue
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
                    id="preview"
                    value="Preview"
                    type="checkbox"
                    variant="secondary"
                    checked={showPreview}
                    onChange={(e) => setShowPreview(e.currentTarget.checked)}
                >
                    Preview
                </ToggleButton>
                <Button
                    variant="primary"
                    onClick={() => submitPost.mutate(postToUpdate ? true : false)}
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
            {/* TODO Make preview with sidebar? Use /post? */}
            {
                showPreview && <Container style={{ maxWidth: "800px" }}>
                    {post.title && <span><h3 className="mb-3">{post.title}</h3><hr /></span>}
                    <Container dangerouslySetInnerHTML={{ __html: post.content }} />
                </Container>
            }

        </Container >
    )
}
export default PostEditor