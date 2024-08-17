import { useRef, useState } from "react"
import { Button, Col, Form, InputGroup, Row, Spinner, ToggleButton, Image } from "react-bootstrap"
// 
import RichTextEditor from "./RichTextEditor"
import IPost, { emptyPost } from "../../interfaces/post"
import TagsInput from "./TagsInput"

function PostEditor({ postToEdit, submitPost, isPending }: { postToEdit?: IPost, submitPost: Function, isPending: boolean }) {
    // if postToUpdate exists, we're in "update mode"
    const [post, setPost] = useState<IPost>(postToEdit ? postToEdit : emptyPost)
    const [thumbnail, setThumbnail] = useState<File | null>()
    const [deleteThumbnail, setDeleteThumbnail] = useState<boolean>(false)
    const thumbnailInputRef = useRef<HTMLInputElement>(null)
    const [showPreview, setShowPreview] = useState<boolean>(false)

    // TODO Validate post (empty title, content)

    return (
        <>

            {/* Title */}
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

            {/* Thumbnail */}
            <Row className="align-items-center">
                <Col xs="auto">
                    <Form.Group controlId="thumbnail">
                        <Form.Label>
                            <h6>Thumbnail</h6>
                            <InputGroup>
                                <Form.Control
                                    type="file"
                                    name="thumbnail"
                                    ref={thumbnailInputRef}
                                    onChange={() => {
                                        setThumbnail(thumbnailInputRef.current?.files?.item(0))
                                    }}
                                />
                                <Button
                                    variant="outline-secondary"
                                    // reset input
                                    onClick={() => {
                                        if (thumbnailInputRef.current) {
                                            thumbnailInputRef.current.value = ""
                                            setThumbnail(null)
                                        }
                                    }}
                                >
                                    <i className="fa-solid fa-xmark" />
                                </Button>
                            </InputGroup>
                        </Form.Label>
                    </Form.Group>

                    {postToEdit &&
                        <Form.Label className="d-flex align-items-center gap-2">
                            <Form.Check
                                type="checkbox"
                                name="deleteThumbnail"
                                checked={deleteThumbnail}
                                onChange={() => setDeleteThumbnail(prev => !prev)}
                            />
                            Delete thumbnail
                        </Form.Label>
                    }
                </Col>
                <Col className="d-flex justify-content-center justify-content-md-start">
                    {post.picture &&
                        <Image
                            height="128px"
                            width="128px"
                            className="border"
                            src={import.meta.env.VITE_API_URL + "/thumbs/" + post.picture}
                        />}
                </Col>
            </Row>

            {/* Editor */}
            <RichTextEditor post={post} setPost={setPost} />

            {/* Tags */}
            <Form.Label className="w-100">
                <h6>Tags</h6>
                <TagsInput
                    tags={post.tags}
                    setTags={(tags: string[]) => setPost(prevPost => ({ ...prevPost, tags: tags }))}
                />
            </Form.Label>

            {/* Buttons */}
            <div className="d-flex gap-2 justify-content-end">

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
                    onClick={() => submitPost({ post, thumbnail, deleteThumbnail })}
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

            </div>

            {/* Post preview */}
            {/* TODO Make preview with sidebar? Use ViewPost? */}
            {
                showPreview &&
                <div style={{ width: "650px" }}>
                    {post.title && <span><h3 className="mb-3">{post.title}</h3><hr /></span>}
                    <div dangerouslySetInnerHTML={{ __html: post.content }} />
                </div>
            }

        </>
    )
}

export default PostEditor