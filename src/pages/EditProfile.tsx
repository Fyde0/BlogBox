import { Button, Col, Form, Row } from "react-bootstrap"
// 
import useUserStore from "../stores/user"
import { IUserInfo } from "../interfaces/user"
import { updateUserInfoMutation } from "../api/users"

export function Component() {
    const { userInfo } = useUserStore()

    const serverUpdateUserInfo = updateUserInfoMutation()

    const formGroupClasses = "d-flex align-items-center"
    const labelStyle = { width: "150px", marginBottom: "0" }

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()

        const formData = new FormData(e.currentTarget)

        // const newUserInfo: IUserInfo = userInfo

        // const file = formData.get("avatar") as File
        // if (!file.type.includes("image")) {
        //     return
        // }

        // newUserInfo.avatar = file
        // newUserInfo.name = String(formData.get("name"))
        // newUserInfo.about = String(formData.get("about"))

        // console.log(JSON.stringify(newUserInfo))

        serverUpdateUserInfo.mutate(formData)

    }

    return (
        <Form
            className="m-auto"
            style={{ maxWidth: "900px" }}
            id="profileForm"
            onSubmit={handleSubmit}
        >

            <Form.Label><h1>Profile</h1></Form.Label>

            <Row>
                <Col
                    md={{ span: 8, order: 'first' }}
                    xs={{ order: 'last' }}
                    className="d-flex flex-column gap-4"
                >

                    <Form.Group controlId="avatar" className={formGroupClasses}>
                        <Form.Label style={labelStyle}>Avatar</Form.Label>
                        <Form.Control type="file" name="avatar" />
                    </Form.Group>

                    <Form.Group controlId="name" className={formGroupClasses}>
                        <Form.Label style={labelStyle}>Name</Form.Label>
                        <Form.Control type="name" name="name" placeholder={userInfo.name} />
                    </Form.Group>

                    <Form.Group controlId="about" className={formGroupClasses}>
                        <Form.Label style={labelStyle}>About me</Form.Label>
                        <Form.Control as="textarea" name="about" rows={3} placeholder={userInfo.about} />
                    </Form.Group>

                    <Button type="submit" className="align-self-start">
                        Save profile
                    </Button>

                </Col>

                <Col
                    md={{ span: 4, order: 'last' }}
                    xs={{ order: 'first' }}
                >
                    avatar
                </Col>
            </Row>
        </Form>
    )
}