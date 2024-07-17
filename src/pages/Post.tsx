import { Col, Container, Row } from "react-bootstrap"

function Post() {
    return (
        <Container>
            <Row>
                {/* col-8 means 8/12 width */}
                <Col className="col-8">
                    <h1 className="display-4">Title</h1>
                    <p className="text-body-secondary">Posted by...</p>
                    <img className="w-100" src="src/assets/pics/placeh1.jpg"></img>
                </Col>
                <Col>
                    <h1 className="display-6">Right</h1>
                    <p className="text-body-secondary">Right text.<br />Information and stuff.</p>
                </Col>
            </Row>
        </Container>
    )
}

export default Post