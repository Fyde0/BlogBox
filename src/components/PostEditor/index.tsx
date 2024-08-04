import { useState } from "react"
import { Button, Container, Form, Spinner, ToggleButton } from "react-bootstrap"
// 
import RichTextEditor from "./RichTextEditor"
import IPost, { emptyPost } from "../../interfaces/post"
import TagsInput from "./TagsInput"

function PostEditor({ postToEdit, submitPost, isPending }: { postToEdit?: IPost, submitPost: Function, isPending: boolean }) {
    // if postToUpdate exists, we're in "update mode"
    const [post, setPost] = useState<IPost>(postToEdit ? postToEdit : emptyPost)
    const [showPreview, setShowPreview] = useState<boolean>(false)

    // TODO Validate post

    return (
        <>

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
            <RichTextEditor post={post} setPost={setPost} />

            {/* Tags */}
            <Container>
                <Form.Label className="w-100">
                    <h6>Tags</h6>
                    <TagsInput 
                        tags={post.tags}
                        setTags={(tags: string[]) => setPost(prevPost => ({...prevPost, tags: tags}))}
                    />
                </Form.Label>
            </Container>

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
                    onClick={() => submitPost(post)}
                    disabled={isPending}
                >
                    {isPending ?
                        <Spinner animation="border" role="status" size="sm">
                            <span className="visually-hidden">Loading...</span>
                        </Spinner>
                        :
                        <span>{postToEdit ? "Update" : "Post"}</span>
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

        </>
    )
}

export default PostEditor