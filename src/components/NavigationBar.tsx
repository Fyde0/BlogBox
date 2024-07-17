import { Container, Nav, Navbar } from "react-bootstrap"
import { LinkContainer } from "react-router-bootstrap"

function NavigationBar() {

    // TODO Theme switcher
    document.documentElement.setAttribute("data-bs-theme", "dark")

    return (
        <Navbar className="bg-body-secondary mb-5">
            <Container className="me-auto">
                <LinkContainer to="/">
                    <Navbar.Brand>BlogBox</Navbar.Brand>
                </LinkContainer>
                <Navbar.Collapse id="mainNavbar">
                    <Nav>
                        {/* <LinkContainer to="/">
                            <Nav.Link>Home</Nav.Link>
                        </LinkContainer> */}
                        <LinkContainer to="post">
                            <Nav.Link>Post</Nav.Link>
                        </LinkContainer>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default NavigationBar