import { Button, Form } from "react-bootstrap";

export function Component() {

    const formGroupClasses = "d-flex align-items-center"
    const labelStyle = { width: "150px", marginBottom: "0" }

    return (
        <Form
            className="m-auto d-flex flex-column gap-4"
            id="blogSettingsForm"
            // onSubmit={handleSubmit}
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