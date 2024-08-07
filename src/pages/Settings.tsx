import { Alert, Button, Col, Form, Row } from "react-bootstrap";
// 
import SlidingAlert from "../components/SlidingAlert";
import useUserStore from "../stores/user";
import { serverChangeSettingsMutation } from "../api/users";
import { FetchError } from "../api/FetchLib";

export function Component() {
    const { userSettings, changeSettings } = useUserStore()

    const col1Width = 2

    const serverSettings = serverChangeSettingsMutation()

    if (serverSettings.isError && !(serverSettings.error instanceof FetchError)) {
        throw serverSettings.error
    }

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        const formData = new FormData(e.currentTarget)
        const newSettings = userSettings
        newSettings.postsPerPage = Number(formData.get("postsPerPage"))
        newSettings.theme = formData.get("theme") as "dark" | "light"

        serverSettings.mutate({ userSettings: newSettings },
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
            {serverSettings.isSuccess && <SlidingAlert variant="success">Settings applied!</SlidingAlert>}

            {/* Error */}
            {serverSettings.isError && <Alert variant="danger" className="align-self-center">{serverSettings.error.message}</Alert>}

            <Form.Group controlId="postsPerPage" as={Row}>
                {/* <Row className="d-flex align-items-center"> */}
                <Form.Label column lg={col1Width}>Posts per page</Form.Label>
                <Col>
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
                </Col>
                {/* </Row> */}
            </Form.Group>

            <Form.Group controlId="theme">
                <Row>
                    <Col lg={col1Width}>
                        <Form.Label>Theme</Form.Label>
                    </Col>
                    <Col>
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
                    </Col>
                </Row>
            </Form.Group>

            <Button type="submit" className="align-self-start">
                Save settings
            </Button>

        </Form>
    )
}