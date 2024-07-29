import { useLocation } from "react-router-dom"
import { Container, Nav, Navbar } from "react-bootstrap"
//
import RouterLink from "./RouterLink"
import AuthNavigation from "./AuthNavigation"
import config from "../../config/config"

function NavigationBar() {
    const { pathname } = useLocation()

    return (
        // TODO Implement expand?
        <Navbar className="navbar bg-primary mb-4" key={pathname}>
            <Container style={{ maxWidth: "1280px" }}>
                <Nav>
                    <RouterLink type="brand" to="/">{config.appName}</RouterLink>
                    <RouterLink to="post" className="nav-link">New post</RouterLink>
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