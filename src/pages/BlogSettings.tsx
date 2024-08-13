import { Button, Form } from "react-bootstrap";
// 
import { changeBlogSettingsMutation, useBlogSettings } from "../api/blogSettings";
import { FetchError } from "../api/FetchLib";
import IBlogSettings from "../interfaces/blogSettings";

export function Component() {
    const blogSettings = useBlogSettings()

    const formGroupClasses = "d-flex align-items-center"
    const labelStyle = { width: "150px", marginBottom: "0" }

    const changeBlogSettings = changeBlogSettingsMutation()

    if (changeBlogSettings.isError && !(changeBlogSettings.error instanceof FetchError)) {
        throw changeBlogSettings.error
    }

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        const formData = new FormData(e.currentTarget)
        const newBlogSettings = blogSettings.data! // data is already checked in Root
        newBlogSettings.theme = formData.get("blogTheme") as IBlogSettings["theme"]

        changeBlogSettings.mutate({ blogSettings: newBlogSettings })
    }

    return (
        <Form
            className="m-auto d-flex flex-column gap-4"
            id="blogSettingsForm"
            onSubmit={handleSubmit}
        >

            <h2>Blog settings</h2>

            <Form.Group controlId="blogTheme" className={formGroupClasses}>
                <Form.Label style={labelStyle}>Theme</Form.Label>
                <Form.Select
                    name="blogTheme"
                    // defaultValue={userSettings.postsPerPage}
                    style={{ width: "120px" }}
                >
                    <option value="minty">Minty</option>
                    <option value="flatly">Flatly</option>
                    <option value="cosmo">Cosmo</option>
                </Form.Select>
            </Form.Group>

            <Button type="submit" className="align-self-start">
                Save settings
            </Button>

        </Form>
    )
}