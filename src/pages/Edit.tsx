import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Button, Container, Form, Spinner, ToggleButton } from "react-bootstrap"
import { useMutation } from "@tanstack/react-query"
import axios from "axios"
// 
import RTEditor from "../components/editor/RTEditor"
import ErrorMessage from "../components/errors/ErrorMessage"
import IPost, { emptyPost } from "../interfaces/post"
import useUserStore from "../stores/user"
import config from "../config/config"

export function Component() {
    const { userInfo } = useUserStore()
    const navigate = useNavigate()
    const [post, setPost] = useState<IPost>({ ...emptyPost, author: userInfo })
    const [showPreview, setShowPreview] = useState<boolean>(false)
    const [error, setError] = useState<string>("")

    const submitPost = useMutation({
        mutationFn: async () => {
            return await axios.post(
                config.api.url + "/posts/create",
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
            {error != "" && <ErrorMessage message={error} />}

            {/* Title */}
            <Container>
                <Form.Label className="w-100">
                    <h3>Title</h3>
                    <Form.Control
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
            <RTEditor setPost={setPost} />

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
                    onClick={() => submitPost.mutate()}
                    disabled={submitPost.isPending}
                >
                    {submitPost.isPending ?
                        <Spinner animation="border" role="status" size="sm">
                            <span className="visually-hidden">Loading...</span>
                        </Spinner>
                        :
                        <span>Post</span>
                    }
                </Button>
            </Container>

            {/* Post preview */}
            {/* TODO Make preview with sidebar? Use /post? */}
            {showPreview && <Container style={{ maxWidth: "800px" }}>
                {post.title && <span><h3 className="mb-3">{post.title}</h3><hr /></span>}
                <Container dangerouslySetInnerHTML={{ __html: post.content }} />
            </Container>}

        </Container>
    )
}