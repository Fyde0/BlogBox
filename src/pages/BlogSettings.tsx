import { useState } from "react";
import { Alert, Button, Form, Spinner } from "react-bootstrap";
import { z } from "zod";
// 
import { changeBlogSettingsMutation, useBlogSettings } from "../api/blogSettings";
import { FetchError } from "../api/FetchLib";
import IBlogSettings from "../interfaces/blogSettings";

export function Component() {
    const blogSettings = useBlogSettings()
    const [validationError, setValidationError] = useState<string>("")

    const formGroupClasses = "d-flex align-items-center"
    const labelStyle = { width: "120px", marginBottom: "0" }

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
        
        const validationResult = z.object({
            blogTitle: z.string()
                .max(32, { message: "The blog title can't be longer than 32 characters." })
        }).safeParse({
            blogTitle: formData.get("blogTitle")
        })

        if (!validationResult.success) {
            setValidationError(validationResult.error.issues[0].message)
            return
        }

        const newBlogSettings = blogSettings.data! // data is already checked in Root
        newBlogSettings.title = formData.get("blogTitle") as IBlogSettings["title"]
        newBlogSettings.theme = formData.get("blogTheme") as IBlogSettings["theme"]

        changeBlogSettings.mutate({ blogSettings: newBlogSettings })
    }

    return (
        <Form
            className="m-auto d-flex flex-column gap-4"
            id="blogSettingsForm"
            onSubmit={handleSubmit}
        >

            {/* Error */}
            {
                changeBlogSettings.isError &&
                <Alert variant="danger" className="w-auto mx-auto">{changeBlogSettings.error.message}</Alert>
            }
            {validationError && <Alert variant="danger" className="w-auto mx-auto">{validationError}</Alert>}

            <h2>Blog settings</h2>

            <Form.Group controlId="blogTitle" className={formGroupClasses}>
                <Form.Label style={labelStyle}>Title</Form.Label>
                <Form.Control
                    name="blogTitle"
                    defaultValue={blogSettings.data?.title}
                    style={{ width: "250px" }}
                />
            </Form.Group>

            <Form.Group controlId="blogTheme" className={formGroupClasses}>
                <Form.Label style={labelStyle}>Theme</Form.Label>
                <Form.Select
                    name="blogTheme"
                    defaultValue={blogSettings.data?.theme}
                    style={{ width: "120px" }}
                >
                    <option value="minty">Minty</option>
                    <option value="flatly">Flatly</option>
                    <option value="cosmo">Cosmo</option>
                </Form.Select>
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