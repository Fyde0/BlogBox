import { useState } from "react";
import { Alert, Button, Form, Spinner } from "react-bootstrap";
// 
import { changeBlogSettingsMutation, useBlogSettings } from "../../../api/blogSettings";
import { FetchError } from "../../../api/FetchLib";
import SlidingAlert from "../../../components/SlidingAlert";
import PostPreview from "../../../components/PostPreview";
import { placeholderPost } from "../../../interfaces/post";
import { postPreviewLgStyle, postPreviewLgStyles } from "../../../components/PostPreview/interfaces/postPreview";

export function Component() {
    const blogSettings = useBlogSettings()
    const [validationError, setValidationError] = useState<string>("")

    const changeBlogSettings = changeBlogSettingsMutation()

    if (changeBlogSettings.isError && !(changeBlogSettings.error instanceof FetchError)) {
        throw changeBlogSettings.error
    }

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        // resets server error
        changeBlogSettings.reset()
        setValidationError("")

        const formData = new FormData(e.currentTarget)

        const newBlogSettings = blogSettings.data! // data is already checked in Root
        newBlogSettings.homeLayout.postPreviewStyle = formData.get("postPreviewStyle") as postPreviewLgStyle

        changeBlogSettings.mutate({ blogSettings: newBlogSettings })
    }

    return (
        <Form
            className="m-auto d-flex flex-column gap-4"
            id="homeLayoutForm"
            onSubmit={handleSubmit}
        >

            {/* Success */}
            {
                changeBlogSettings.isSuccess &&
                <SlidingAlert variant="success">Settings applied!</SlidingAlert>
            }

            {/* Error */}
            {
                changeBlogSettings.isError &&
                <Alert variant="danger" className="w-auto mx-auto">{changeBlogSettings.error.message}</Alert>
            }
            {validationError && <Alert variant="danger" className="w-auto mx-auto">{validationError}</Alert>}

            <Form.Group
                controlId="postPreviewStyle"
                className="d-flex flex-column"
                key="postPreviewStyle"
            >
                <Form.Label><h2>Style of post previews</h2></Form.Label>

                {postPreviewLgStyles.map((style) => {
                    return (
                        <div key={style}>
                            <div className="py-3">
                                <Form.Check id={style} className="d-flex align-items-center">
                                    <Form.Check.Input
                                        type="radio"
                                        name="postPreviewStyle"
                                        value={style}
                                        className="me-3"
                                        defaultChecked={blogSettings.data?.homeLayout.postPreviewStyle === style as string}
                                    />
                                    <Form.Check.Label>
                                        <div style={{ pointerEvents: "none" }}>
                                            <PostPreview styleOverride={style} post={placeholderPost}></PostPreview>
                                        </div>
                                    </Form.Check.Label>
                                </Form.Check>
                            </div>
                            <hr />
                        </div>
                    )
                })}

            </Form.Group>

            <Button
                type="submit"
                className="align-self-start"
                disabled={changeBlogSettings.isPending}
            >
                {changeBlogSettings.isPending ?
                    <Spinner animation="border" role="status" size="sm">
                        <span className="visually-hidden">Loading...</span>
                    </Spinner>
                    :
                    <span>Save settings</span>
                }
            </Button>

        </Form>
    )
}