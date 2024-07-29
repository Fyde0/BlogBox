import { Container, Spinner } from "react-bootstrap"

function Loading() {
    return (
        <Container className="d-flex justify-content-center">
            <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
            </Spinner>
        </Container>
    )
}

export default Loading