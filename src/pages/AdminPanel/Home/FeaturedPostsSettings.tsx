import { useState } from "react";
import { Alert, Button, Form, Spinner } from "react-bootstrap";
// 
import { changeBlogSettingsMutation, useBlogSettings } from "../../../api/blogSettings";
import { FetchError } from "../../../api/FetchLib";
import SlidingAlert from "../../../components/SlidingAlert";
import TagsInput from "../../../components/PostEditor/TagsInput";

export function Component() {
    const blogSettings = useBlogSettings()
    const [validationError, setValidationError] = useState<string>("")
    const [tags, setTags] = useState<string[]>(blogSettings.data?.homeLayout.featuredPostsTags || [])

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
        newBlogSettings.homeLayout.featuredPosts = formData.get("enableFeaturedPosts") ? true : false
        newBlogSettings.homeLayout.featuredPostsTags = tags

        console.log(newBlogSettings.homeLayout)

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

            <Form.Label><h2>Featured posts settings</h2></Form.Label>

            <Form.Group controlId="enableFeaturedPosts" className="d-flex align-items-center gap-2">
                <Form.Check
                    type="checkbox"
                    name="enableFeaturedPosts"
                    defaultChecked={blogSettings.data?.homeLayout.featuredPosts}
                />
                <Form.Label className="mb-0">Enable featured posts</Form.Label>
            </Form.Group>

            <Form.Group>
                <Form.Label className="w-100">
                    <p className="mb-1">Tags</p>
                    <TagsInput tags={tags} setTags={setTags} />
                </Form.Label>
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