import { useState } from "react"
import { Link, Navigate } from "react-router-dom"
import { Alert, Button, Container, Form } from "react-bootstrap"
import { z } from "zod"
// 
import { FetchError } from "../api/FetchLib"
import { loginMutation } from "../api/users"
import useUserStore from "../stores/user"

export function Component() {
    const [username, setUsername] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [validationError, setValidationError] = useState<string>("")
    const { clientLogin } = useUserStore()

    const serverLogin = loginMutation()

    if (serverLogin.isSuccess) {
        return <Navigate to="/" replace={true} />
    }

    if (serverLogin.isError && !(serverLogin.error instanceof FetchError)) {
        throw serverLogin.error
    }

    function handleLogin(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        // resets server error
        serverLogin.reset()
        setValidationError("")

        const validationResult = z.object({
            username: z.string().min(1, { message: "Username required." }),
            password: z.string().min(1, { message: "Password required." })
        }).safeParse({ username, password })

        if (!validationResult.success) {
            setValidationError(validationResult.error.issues[0].message)
        }

        serverLogin.mutate(
            { username, password },
            {
                onSuccess: ({ userInfo, userSettings }) => {
                    clientLogin(userInfo, userSettings)
                }
            }
        )
    }

    return (
        <Form
            className="m-auto d-flex flex-column justify-content-center gap-4"
            // makes Enter key work
            onSubmit={handleLogin}
            style={{ maxWidth: "300px" }}
        >

            <Container>
                <h3 className="mb-0">Login</h3>
            </Container>

            <Container>

                {/* Error */}
                {serverLogin.isError && <Alert variant="danger" className="align-self-center">{serverLogin.error.message}</Alert>}
                {validationError && <Alert variant="danger" className="align-self-center">{validationError}</Alert>}

                {/* Username */}
                <Form.Label className="w-100">
                    Username
                    <Form.Control
                        type="username"
                        value={username}
                        onChange={(e) => setUsername(e.currentTarget.value)}
                    />
                </Form.Label>

                {/* Password */}
                <Form.Label className="w-100">
                    Password
                    <Form.Control
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.currentTarget.value)}
                    />
                </Form.Label>

            </Container>

            <Container>
                <Button
                    size="lg"
                    className="w-100"
                    type="submit"
                >
                    {serverLogin.isPending ?
                        <>
                            <span className="spinner-border spinner-border-sm" aria-hidden="true"></span>
                            <span className="visually-hidden" role="status">Loading...</span>
                        </>
                        :
                        <span>Sign In</span>
                    }
                </Button>
            </Container>

            <Container>
                <small>You don't have an account? You can make one <Link to="/register">here</Link>.</small>
            </Container>

        </Form>
    )
}