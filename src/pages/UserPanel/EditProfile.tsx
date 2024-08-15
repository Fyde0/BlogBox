import { useRef, useState } from "react"
import { Alert, Button, Col, Form, InputGroup, Row } from "react-bootstrap"
import { z } from "zod"
// 
import SlidingAlert from "../../components/SlidingAlert"
import Avatar from "../../components/Avatar"
import useUserStore from "../../stores/user"
import { updateUserInfoMutation } from "../../api/users"
import { FetchError } from "../../api/FetchLib"

export function Component() {
    const { userInfo, changeUserInfo } = useUserStore()
    const [validationError, setValidationError] = useState<string>("")
    const avatarInputRef = useRef<HTMLInputElement>(null)

    // API setup
    const serverUpdateUserInfo = updateUserInfoMutation()

    if (serverUpdateUserInfo.isError && !(serverUpdateUserInfo.error instanceof FetchError)) {
        throw serverUpdateUserInfo.error
    }

    const formGroupClasses = "d-flex align-items-center flex-wrap"

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        // resets server error
        serverUpdateUserInfo.reset()
        setValidationError("")

        const form = document.getElementById("editProfileForm") as HTMLFormElement
        const formData = new FormData(e.currentTarget)
        const avatar = formData.get("avatar")

        // TS
        if (!(avatar instanceof File)) { return }

        const validationResult = z.object({
            fileSize: z.number()
                .max(1 * 1024 * 512, { message: "The avatar can't be larger than 512Kb." }),
            name: z.string()
                .max(50, { message: "Your name can't be longer than 50 characters." })
                .optional(),
            about: z.string()
                .max(500, { message: "Your About me field can't be longer than 500 characters." })
                .optional(),
        }).safeParse({
            fileSize: avatar.size,
            name: formData.get("name"),
            about: formData.get("about")
        })

        if (!validationResult.success) {
            setValidationError(validationResult.error.issues[0].message)
            return
        }

        serverUpdateUserInfo.mutate(
            formData,
            {
                onSuccess: (userInfo) => {
                    changeUserInfo(userInfo)
                    form.reset()
                }
            }
        )

    }

    return (
        <Form
            className="m-auto d-flex flex-column gap-4"
            id="editProfileForm"
            onSubmit={handleSubmit}
        >

            <h2>Profile</h2>

            {/* Success */}
            {
                serverUpdateUserInfo.isSuccess &&
                <SlidingAlert variant="success">Settings applied!</SlidingAlert>
            }

            {/* Error */}
            {
                serverUpdateUserInfo.isError &&
                <Alert variant="danger" className="w-auto mx-auto">{serverUpdateUserInfo.error.message}</Alert>
            }
            {validationError && <Alert variant="danger" className="w-auto mx-auto">{validationError}</Alert>}

            <Row>

                {/* Current avatar and delete checkbox */}
                <Col
                    md={{ span: 4, order: 'last' }}
                    xs={{ order: 'first' }}
                    className="d-flex flex-column align-items-center gap-2"
                >
                    <Avatar avatar={userInfo.avatar} />

                    <Form.Group controlId="deleteAvatar" className={formGroupClasses}>
                        <Form.Check type="checkbox" name="deleteAvatar" />
                        <Form.Label className="mb-0 ms-1">Delete avatar</Form.Label>
                    </Form.Group>
                </Col>

                <Col
                    md={{ span: 8, order: 'first' }}
                    xs={{ order: 'last' }}
                    className="d-flex flex-column gap-4"
                >

                    <Form.Group controlId="avatar" className={formGroupClasses}>
                        <Form.Label>Avatar</Form.Label>
                        <InputGroup>
                            <Form.Control type="file" name="avatar" ref={avatarInputRef} />
                            <Button
                                variant="outline-secondary"
                                // reset input
                                onClick={() => {
                                    if (avatarInputRef.current) {
                                        avatarInputRef.current.value = ""
                                    }
                                }}
                            >
                                <i className="fa-solid fa-xmark" />
                            </Button>
                        </InputGroup>
                    </Form.Group>

                    <Form.Group controlId="name" className={formGroupClasses}>
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="name" name="name" defaultValue={userInfo.name} />
                    </Form.Group>

                    <Form.Group controlId="about" className={formGroupClasses}>
                        <Form.Label>About me</Form.Label>
                        <Form.Control as="textarea" name="about" rows={3} defaultValue={userInfo.about} />
                    </Form.Group>

                    <Button type="submit" className="align-self-start">
                        Save profile
                    </Button>

                </Col>
            </Row>
        </Form>
    )
}