import { useLocation } from "react-router-dom"
import { Container, Nav, Navbar } from "react-bootstrap"
import { LinkContainer } from "react-router-bootstrap"
// Components
import Logout from "./Logout"
// Stores and config
import useUserStore from "../stores/user"
import config from "../config/config"

function NavigationBar() {
    const { loggedIn } = useUserStore()
    const { pathname } = useLocation()

    // TODO Theme switcher
    document.documentElement.setAttribute("data-bs-theme", "dark")

    return (
        // Weird setup because of react-router + react-bootstrap
        // see https://github.com/react-bootstrap/react-router-bootstrap/issues/242#issuecomment-613761912
        <Navbar className="navbar bg-body-tertiary mb-4" key={pathname}>
            <Container style={{ maxWidth: "1280px" }}>
                <Nav>
                    <LinkContainer to="/">
                        <Navbar.Brand>{config.appName}</Navbar.Brand>
                    </LinkContainer>
                    <LinkContainer to="post/new">
                        <Nav.Link className="nav-link" active={false}>New post</Nav.Link>
                    </LinkContainer>
                </Nav>
                <Navbar.Toggle />
                <Navbar.Collapse className="justify-content-end">
                    <Nav>
                        {!loggedIn ?
                            <LinkContainer to="login">
                                <Nav.Link className="nav-link" active={false}>Login</Nav.Link>
                            </LinkContainer>
                            :
                            <Logout />
                        }
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default NavigationBar