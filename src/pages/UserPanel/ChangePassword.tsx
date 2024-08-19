import { useState } from "react"
import { Alert, Button, Col, Form, Row, Spinner } from "react-bootstrap"
import { z } from "zod"
// 
import useUserStore from "../../stores/user"
import { changePasswordMutation } from "../../api/users"
import { FetchError } from "../../api/FetchLib"

export function Component() {
    const { clientLogout } = useUserStore()
    const [validationError, setValidationError] = useState<string>("")

    // API setup
    const changePassword = changePasswordMutation()

    if (changePassword.isError && !(changePassword.error instanceof FetchError)) {
        throw changePassword.error
    }

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        // resets server error
        changePassword.reset()
        setValidationError("")

        const formData = new FormData(e.currentTarget)
        const oldPassword = formData.get("oldPassword") as string
        const newPassword = formData.get("newPassword") as string

        const passwordSchema = z
            .string()
            .min(1, { message: "Password required." })
            .min(4, { message: "The password must be between 4 and 50 characters." })
            .max(50, { message: "The password must be between 4 and 50 characters." })

        const validationResult = z.object({
            oldPassword: passwordSchema,
            newPassword: passwordSchema
        }).safeParse({ oldPassword, newPassword })

        if (!validationResult.success) {
            setValidationError(validationResult.error.issues[0].message)
            return
        }

        changePassword.mutate({ oldPassword, newPassword }, { onSuccess: clientLogout })

    }

    return (
        <Form
            className="m-auto d-flex flex-column gap-4"
            id="changePasswordForm"
            onSubmit={handleSubmit}
        >

            {/* Error */}
            {
                changePassword.isError &&
                <Alert variant="danger" className="w-auto mx-auto">{changePassword.error.message}</Alert>
            }
            {validationError && <Alert variant="danger" className="w-auto mx-auto">{validationError}</Alert>}

            <h2>Change password</h2>

            <Row>
                <Col className="d-flex flex-column gap-4">
                    <Form.Group controlId="oldPassword">
                        <Row className="g-1">
                            <Col md="2" className="d-flex align-items-center">
                                <Form.Label style={{ marginBottom: "0" }}>Old password</Form.Label>
                            </Col>
                            <Col>
                                <Form.Control
                                    name="oldPassword"
                                    type="password"
                                    style={{ width: "250px" }}
                                />
                            </Col>
                        </Row>
                    </Form.Group>
                    <Form.Group controlId="newPassword">
                        <Row className="g-1">
                            <Col md="2" className="d-flex align-items-center">
                                <Form.Label style={{ marginBottom: "0" }}>New password</Form.Label>
                            </Col>
                            <Col>
                                <Form.Control
                                    name="newPassword"
                                    type="password"
                                    style={{ width: "250px" }}
                                />
                            </Col>
                        </Row>
                    </Form.Group>

                </Col>
            </Row>

            <Button
                type="submit"
                className="align-self-start"
                disabled={changePassword.isPending}
            >
                {changePassword.isPending ?
                    <Spinner animation="border" role="status" size="sm">
                        <span className="visually-hidden">Loading...</span>
                    </Spinner>
                    :
                    <span>Change password</span>
                }
            </Button>

        </Form>
    )
}