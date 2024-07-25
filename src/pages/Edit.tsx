import { useState } from "react"
import { Button, Container, ToggleButton } from "react-bootstrap"
import { useMutation } from "@tanstack/react-query"
import axios from "axios"
// 
import RTEditor from "../components/editor/RTEditor"
import useUserStore from "../stores/user"
import IPost, { emptyPost } from "../interfaces/post"
import config from "../config/config"

function Edit() {
    const { userInfo } = useUserStore()
    const [post, setPost] = useState<IPost>({ ...emptyPost, author: userInfo })
    const [showPreview, setShowPreview] = useState<boolean>(false)

    const submitPost = useMutation({
        mutationFn: async () => {
            return await axios.post(
                config.api.url + "/posts/create",
                { ...post },
                { withCredentials: true }
            )
        },
        onSuccess: (data: any) => {
            console.log(data)
        },
        onError: (error: any) => {
            console.log(error)
        },
    })

    function handleSubmitPost() {
        console.log("submitting")
        console.log(post)
        submitPost.mutate()
    }

    return (
        <Container
            className="m-auto d-flex flex-column justify-content-center gap-4"
            style={{ maxWidth: "900px" }}
        >

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
                    onClick={handleSubmitPost}
                    disabled={submitPost.isPending}
                >
                    {submitPost.isPending ?
                        <>
                            <span className="spinner-border spinner-border-sm" aria-hidden="true"></span>
                            <span className="visually-hidden" role="status">Loading...</span>
                        </>
                        :
                        <span>Post</span>
                    }
                </Button>
            </Container>

            {/* Post preview */}
            {/* TODO Make preview with sidebar? */}
            {showPreview && <Container style={{ maxWidth: "800px" }}>
                {post.title && <span><h3 className="mb-3">{post.title}</h3><hr /></span>}
                <Container dangerouslySetInnerHTML={{ __html: post.content }} />
            </Container>}

        </Container>
    )
}

export default Edit
