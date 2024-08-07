import { useLocation } from "react-router-dom"
import { Container, Nav, Navbar } from "react-bootstrap"
//
import RouterLink from "../RouterLink"
import Auth from "./Auth"
import config from "../../config/config"

function NavigationBar() {
    const { pathname } = useLocation()

    return (
        // TODO Implement expand?
        <Navbar className="bg-body-tertiary border-bottom shadow-sm z-3" key={pathname}>
            <Container style={{ maxWidth: "1200px" }}>
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
                    <Auth />
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default NavigationBar