import { ReactNode } from "react"
import { Button, Nav, Navbar } from "react-bootstrap"
import { LinkContainer } from "react-router-bootstrap"

// Weird setup because of react-router + react-bootstrap
// see https://github.com/react-bootstrap/react-router-bootstrap/issues/242#issuecomment-613761912

interface INavLinkProps {
    to: string
    children?: ReactNode
    type?: string
    className?: string
}

function RouterLink(props: INavLinkProps) {

    let element: ReactNode
    switch (props.type) {
        case "brand":
            element = <Navbar.Brand>{props.children}</Navbar.Brand>
            break;
        case "button":
            element = <Button>{props.children}</Button>
            break;
        default:
            element = <Nav.Link active={false} className={props.className}>{props.children}</Nav.Link>
            break;
    }

    return (
        <LinkContainer to={props.to}>
            {element}
        </LinkContainer>
    )
}

export default RouterLink