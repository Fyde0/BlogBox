import { useLocation } from "react-router-dom"
import { Container, Nav, Navbar, Offcanvas } from "react-bootstrap"
//
import RouterLink from "../RouterLink"
import Auth from "./Auth"
import config from "../../config/config"

function NavigationBar() {
    const { pathname } = useLocation()
    // need pathname to rerender nav (see components/RouterLink)

    return (
        <Navbar className="bg-body-tertiary border-bottom shadow-sm z-1" expand="md" key={pathname}>
            <Container style={{ maxWidth: "1280px" }}>

                {/* Brand / Logo */}
                <RouterLink type="brand" to="/">
                    <i className="fa-solid fa-box me-2"></i>
                    {config.appName}
                </RouterLink>

                {/* Toggle icon on small screens */}
                <Navbar.Toggle className="ms-auto">
                    <i className="fa-solid fa-bars" style={{ fontSize: "120%" }} />
                </Navbar.Toggle>

                {/* Offcanvas */}
                <Navbar.Offcanvas placement="end" style={{ width: "250px" }}>

                    <Offcanvas.Header closeButton>
                        <Offcanvas.Title>Navigation</Offcanvas.Title>
                    </Offcanvas.Header>

                    <Offcanvas.Body className="align-items-center">
                        <Nav>
                            <RouterLink to="/">Home</RouterLink>
                            <RouterLink to="post">New post</RouterLink>
                        </Nav>
                        {/* 
                        "justify-content-end flex-grow-1" doesn't break the offcanvas
                        because Offcanvas.Body is only "display: flex" when active
                        */}
                        <Nav className="justify-content-end flex-grow-1">
                            <Auth />
                        </Nav>
                    </Offcanvas.Body>

                </Navbar.Offcanvas>
            </Container>
        </Navbar>
    )
}

export default NavigationBar