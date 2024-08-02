import { useLocation } from "react-router-dom"
import { Container, Nav, Navbar } from "react-bootstrap"
//
import RouterLink from "../RouterLink"
import AuthNavigation from "./Auth"
import config from "../../config/config"

function NavigationBar() {
    const { pathname } = useLocation()

    return (
        // TODO Implement expand?
        <Navbar className="bg-primary" key={pathname}>
            <Container style={{ maxWidth: "1280px" }}>
                <Nav>
                    <RouterLink type="brand" to="/">
                        <i className="fa-solid fa-box me-2"></i>
                        {config.appName}
                    </RouterLink>
                    <RouterLink to="/">Home</RouterLink>
                    <RouterLink to="post">New post</RouterLink>
                </Nav>
                <Navbar.Toggle />
                <Navbar.Collapse className="justify-content-end">
                    <AuthNavigation />
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default NavigationBar