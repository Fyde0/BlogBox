import { Outlet } from "react-router-dom"
import { Container } from "react-bootstrap"
import NavigationBar from "../components/NavigationBar"

function Root() {
    return (
        // Main container
        <Container fluid="true">
            <NavigationBar />
            <Outlet />
        </Container>
    )
}

export default Root