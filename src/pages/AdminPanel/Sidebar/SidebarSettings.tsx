import { useState } from "react";
import { Alert, Button, Col, Form, Row, Spinner } from "react-bootstrap";
// 
import { changeBlogSettingsMutation, useBlogSettings } from "../../../api/blogSettings";
import { FetchError } from "../../../api/FetchLib";
import SlidingAlert from "../../../components/SlidingAlert";
import IBlogSettings, { defaultBlogSettings } from "../../../interfaces/blogSettings";
import Sidebar from "../../../components/Sidebar";

export function Component() {
    const blogSettings = useBlogSettings()
    const [newSidebarLayout, setNewSidebarLayout] =
        useState<IBlogSettings["sidebarLayout"]>(blogSettings.data?.sidebarLayout || defaultBlogSettings.sidebarLayout)
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
        newBlogSettings.sidebarLayout = newSidebarLayout

        changeBlogSettings.mutate({ blogSettings: newBlogSettings })
    }

    return (
        <Form
            className="m-auto d-flex flex-column gap-4"
            id="sidebarSettings"
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

            <Form.Label><h2>Sidebar settings</h2></Form.Label>

            <Row className="g-3">
                <Col md="6" className="d-flex flex-column gap-4">

                    <Form.Group controlId="showArchives" className="d-flex align-items-center gap-2">
                        <Form.Check
                            type="checkbox"
                            name="showArchives"
                            checked={newSidebarLayout.showArchives}
                            onChange={() => setNewSidebarLayout(prev => ({ ...prev, showArchives: !prev.showArchives }))}
                        />
                        <Form.Label className="mb-0">Show archives</Form.Label>
                    </Form.Group>

                    <Form.Group controlId="showTags" className="d-flex align-items-center gap-2">
                        <Form.Check
                            type="checkbox"
                            name="showTags"
                            checked={newSidebarLayout.showTags}
                            onChange={() => setNewSidebarLayout(prev => ({ ...prev, showTags: !prev.showTags }))}
                        />
                        <Form.Label className="mb-0">Show Tags</Form.Label>
                    </Form.Group>

                    <Form.Group controlId="showLatestPosts" className="d-flex align-items-center gap-2">
                        <Form.Check
                            type="checkbox"
                            name="showLatestPosts"
                            checked={newSidebarLayout.showLatestPosts}
                            onChange={() => setNewSidebarLayout(prev => ({ ...prev, showLatestPosts: !prev.showLatestPosts }))}
                        />
                        <Form.Label className="mb-0">Show latest posts</Form.Label>
                    </Form.Group>

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

                </Col>
                <Col md="6">
                    <h4>Preview</h4>
                    <hr />
                    <Sidebar overrideLayout={newSidebarLayout} />
                </Col>
            </Row>



        </Form>
    )
}