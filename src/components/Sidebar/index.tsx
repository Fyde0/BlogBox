import { Container } from "react-bootstrap"
//
import Archives from "./Archives"

function Sidebar() {
    return (
        <Container className="d-flex flex-column gap-3 p-0">
            <Archives />
        </Container>
    )
}

export default Sidebar