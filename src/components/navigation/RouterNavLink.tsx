import { ReactNode } from "react"
import { Nav, Navbar } from "react-bootstrap"
import { LinkContainer } from "react-router-bootstrap"

// Weird setup because of react-router + react-bootstrap
// see https://github.com/react-bootstrap/react-router-bootstrap/issues/242#issuecomment-613761912

interface INavLinkProps {
    to: string
    children?: ReactNode
    type?: string
    className?: string
}

function RouterNavLink(props: INavLinkProps) {
    return (
        <LinkContainer to={props.to}>
            {
                props.type === "brand"
                    ?
                    <Navbar.Brand>{props.children}</Navbar.Brand>
                    :
                    <Nav.Link active={false} className={props.className}>{props.children}</Nav.Link>
            }
        </LinkContainer>
    )
}

export default RouterNavLink