import { useState } from "react"
import { Alert, Button, Container, Form } from "react-bootstrap"
import { z } from "zod"
// 
import { registerMutation } from "../api/users"
import { FetchError } from "../api/FetchLib"
import IUser, { emptyUser } from "../interfaces/user"

export function Component() {
    const [user, setUser] = useState<IUser>(emptyUser)
    const [validationError, setValidationError] = useState<string>("")

    const register = registerMutation()

    if (register.isError && !(register.error instanceof FetchError)) {
        throw register.error
    }

    function handleLogin(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        // resets server error
        register.reset()
        setValidationError("")

        const validationResult = z.object({
            username: z
                .string()
                .min(1, { message: "Username required." })
                .min(4, { message: "The username must be between 4 and 32 characters." })
                .max(32, { message: "The username must be between 4 and 32 characters." })
                .regex(/^([a-z0-9-_]+)$/, { message: "The username contains invalid characters." }),
            password: z
                .string()
                .min(1, { message: "Password required." })
                .min(4, { message: "The password must be between 4 and 50 characters." })
                .max(50, { message: "The password must be between 4 and 50 characters." }),
        })
            .safeParse({ username: user.username, password: user.password })

        if (!validationResult.success) {
            setValidationError(validationResult.error.issues[0].message)
            return false
        }

        setValidationError("")
        register.mutate({ user })
    }

    return (
        <Form
            className="m-auto d-flex flex-column justify-content-center gap-4"
            // makes Enter key work
            onSubmit={handleLogin}
            style={{ maxWidth: "300px" }}
        >

            <Container>
                <h3 className="mb-0">Sign up</h3>
            </Container>

            <Container>

                {/* Success */}
                {register.isSuccess &&
                    <Alert variant="success" className="align-self-center">
                        You are signed up! You can login now.
                    </Alert>}

                {/* Error */}
                {register.isError && <Alert variant="danger" className="align-self-center">{register.error.message}</Alert>}
                {validationError && <Alert variant="danger" className="align-self-center">{validationError}</Alert>}

                {/* Username */}
                <Form.Label className="w-100">
                    Username
                    <Form.Control
                        type="username"
                        value={user.username}
                        onChange={event => setUser(prevUser => (
                            { ...prevUser, username: event.target.value }
                        ))}
                    />
                </Form.Label>

                {/* Password */}
                <Form.Label className="w-100">
                    Password
                    <Form.Control
                        type="password"
                        value={user.password}
                        onChange={event => setUser(prevUser => (
                            { ...prevUser, password: event.target.value }
                        ))}
                    />
                </Form.Label>

            </Container>

            <Container>
                <Button
                    size="lg"
                    className="w-100"
                    type="submit"
                >
                    {register.isPending ?
                        <>
                            <span className="spinner-border spinner-border-sm" aria-hidden="true"></span>
                            <span className="visually-hidden" role="status">Loading...</span>
                        </>
                        :
                        <span>Sign Up</span>
                    }
                </Button>
            </Container>

        </Form>
    )
}