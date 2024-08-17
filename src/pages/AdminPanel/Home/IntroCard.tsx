import { useState } from "react";
import { Alert, Button, Col, Form, Row, Spinner } from "react-bootstrap";
// 
import { changeBlogSettingsMutation, useBlogSettings } from "../../../api/blogSettings";
import { FetchError } from "../../../api/FetchLib";
import SlidingAlert from "../../../components/SlidingAlert";
import Intro from "../../../components/Sidebar/Intro";

export function Component() {
    const blogSettings = useBlogSettings()
    const [enableCard, setEnableCard] = useState<boolean>(blogSettings.data?.homeLayout.introCard || false)
    const [title, setTitle] = useState<string>(blogSettings.data?.homeLayout.introCardTitle || "")
    const [content, setContent] = useState<string>(blogSettings.data?.homeLayout.introCardContent || "")
    const [validationError, setValidationError] = useState<string>("")

    const changeBlogSettings = changeBlogSettingsMutation()

    if (changeBlogSettings.isError && !(changeBlogSettings.error instanceof FetchError)) {
        throw changeBlogSettings.error
    }

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        // resets server error
        changeBlogSettings.reset()
        setValidationError("")

        const newBlogSettings = blogSettings.data! // data is already checked in Root
        newBlogSettings.homeLayout.introCard = enableCard
        newBlogSettings.homeLayout.introCardTitle = title
        newBlogSettings.homeLayout.introCardContent = content

        changeBlogSettings.mutate({ blogSettings: newBlogSettings })
    }

    return (
        <Form
            id="introCardSettings"
            className="m-auto d-flex flex-column gap-4"
            onSubmit={handleSubmit}
        >

            {/* Success */}
            {
                changeBlogSettings.isSuccess &&
                <SlidingAlert variant="success">Settings applied!</SlidingAlert>
            }

            {/* Error */}
            {
                changeBlogSettings.isError &&
                <Alert variant="danger" className="w-auto mx-auto">{changeBlogSettings.error.message}</Alert>
            }
            {validationError && <Alert variant="danger" className="w-auto mx-auto">{validationError}</Alert>}

            <Form.Label><h2>Intro card settings</h2></Form.Label>

            <Row className="g-3">
                <Col md="6" className="m-auto d-flex flex-column gap-4">

                    <Form.Group controlId="enableIntroCard" className="d-flex align-items-center gap-2">
                        <Form.Check
                            type="checkbox"
                            name="enableIntroCard"
                            checked={enableCard}
                            onChange={() => setEnableCard(prev => !prev)}
                        />
                        <Form.Label className="mb-0">Enable intro card</Form.Label>
                    </Form.Group>

                    <Form.Group controlId="title">
                        <Form.Label>Title</Form.Label>
                        <Form.Control
                            name="title"
                            value={title}
                            onChange={(e) => setTitle(e.currentTarget.value)}
                        />
                    </Form.Group>

                    <Form.Group controlId="intro">
                        <Form.Label>Content</Form.Label>
                        <Form.Control
                            as="textarea"
                            name="content"
                            rows={3}
                            value={content}
                            onChange={(e) => setContent(e.currentTarget.value)}
                        />
                    </Form.Group>

                </Col>
                <Col md="6">
                    <h4>Preview</h4>
                    <Intro overrideTitle={title} overrideContent={content} />
                </Col>
            </Row>

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