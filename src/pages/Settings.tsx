import { Alert, Button, Form } from "react-bootstrap";
// 
import SlidingAlert from "../components/SlidingAlert";
import useUserStore from "../stores/user";
import { changeSettingsMutation } from "../api/users";
import { FetchError } from "../api/FetchLib";

export function Component() {
    const { userSettings, changeSettings } = useUserStore()

    const formGroupClasses = "d-flex align-items-center"
    const labelStyle = { width: "150px", marginBottom: "0" }

    const serverChangeSettings = changeSettingsMutation()

    if (serverChangeSettings.isError && !(serverChangeSettings.error instanceof FetchError)) {
        throw serverChangeSettings.error
    }

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        const formData = new FormData(e.currentTarget)
        const newSettings = userSettings
        newSettings.postsPerPage = Number(formData.get("postsPerPage"))
        newSettings.theme = formData.get("theme") as "dark" | "light"

        serverChangeSettings.mutate({ userSettings: newSettings },
            { onSuccess: (data) => { changeSettings(data) } }
        )
    }

    return (
        <Form
            className="m-auto d-flex flex-column gap-4"
            style={{ maxWidth: "900px" }}
            id="settingsForm"
            onSubmit={handleSubmit}
        >

            <Form.Label><h1>Settings</h1></Form.Label>

            {/* Success */}
            {serverChangeSettings.isSuccess && <SlidingAlert variant="success">Settings applied!</SlidingAlert>}

            {/* Error */}
            {serverChangeSettings.isError && <Alert variant="danger" className="align-self-center">{serverChangeSettings.error.message}</Alert>}

            <Form.Group controlId="postsPerPage" className={formGroupClasses}>
                <Form.Label style={labelStyle}>Posts per page</Form.Label>
                <Form.Select
                    name="postsPerPage"
                    defaultValue={userSettings.postsPerPage}
                    style={{ width: "80px" }}
                >
                    <option value="5">5</option>
                    <option value="10">10</option>
                    <option value="15">15</option>
                    <option value="20">20</option>
                    <option value="25">25</option>
                </Form.Select>
            </Form.Group>

            <Form.Group controlId="theme" className={formGroupClasses}>
                <Form.Label style={labelStyle}>Theme</Form.Label>
                <Form.Check
                    inline type="radio" id="dark"
                    name="theme" label="Dark" value="dark"
                    defaultChecked={userSettings.theme === "dark"}
                />
                <Form.Check
                    inline type="radio" id="light"
                    name="theme" label="Light" value="light"
                    defaultChecked={userSettings.theme === "light"}
                />
            </Form.Group>

            <Button type="submit" className="align-self-start">
                Save settings
            </Button>

        </Form>
    )
}