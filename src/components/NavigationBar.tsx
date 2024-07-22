import { Container, Nav, Navbar } from "react-bootstrap"
import { LinkContainer } from "react-router-bootstrap"
// Stores and config
import useUserStore from "../stores/user"
import config from "../config/config"

function NavigationBar() {
    const { loggedIn } = useUserStore()

    // TODO Theme switcher
    document.documentElement.setAttribute("data-bs-theme", "dark")

    return (
        <Navbar className="bg-body-secondary mb-5">
            <Container className="col-auto">
                <LinkContainer to="/">
                    <Navbar.Brand>{config.appName}</Navbar.Brand>
                </LinkContainer>
                <Navbar.Collapse id="mainNavbar">
                    <Nav>
                        <LinkContainer to="post">
                            <Nav.Link>Post</Nav.Link>
                        </LinkContainer>
                    </Nav>
                </Navbar.Collapse>
            </Container>
            <Container className="col-auto">
                <Nav>
                    {!loggedIn ?
                        <LinkContainer to="login">
                            <Nav.Link>Login</Nav.Link>
                        </LinkContainer>
                        :
                        <LinkContainer to="logout">
                            <Nav.Link>Logout</Nav.Link>
                        </LinkContainer>
                    }
                </Nav>
            </Container>
        </Navbar>
    )
}

export default NavigationBar