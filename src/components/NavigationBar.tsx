import { useLocation } from "react-router-dom"
import { Container, Nav, Navbar } from "react-bootstrap"
//
import RouterNavLink from "./navigation/RouterNavLink"
import AuthNavigation from "./navigation/AuthNavigation"
//
import config from "../config/config"

function NavigationBar() {
    const { pathname } = useLocation()

    // TODO Theme switcher
    document.documentElement.setAttribute("data-bs-theme", "dark")

    return (
        <Navbar className="navbar bg-body-tertiary mb-4" key={pathname}>
            <Container style={{ maxWidth: "1280px" }}>
                <Nav>
                    <RouterNavLink type="brand" to="/">{config.appName}</RouterNavLink>
                    <RouterNavLink to="post/new" className="nav-link">New post</RouterNavLink>
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