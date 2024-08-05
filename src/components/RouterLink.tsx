import { ReactNode } from "react"
import { Button, Nav, Navbar, Pagination } from "react-bootstrap"
import { LinkContainer } from "react-router-bootstrap"

// Weird setup because of react-router + react-bootstrap
// see https://github.com/react-bootstrap/react-router-bootstrap/issues/242#issuecomment-613761912

interface IRouterLinkProps {
    to: string
    children?: ReactNode
    type?: string
    pageActive?: boolean
    className?: string
}

function RouterLink(props: IRouterLinkProps) {

    let element: ReactNode
    switch (props.type) {
        case "brand":
            element = <Navbar.Brand>{props.children}</Navbar.Brand>
            break;
        case "button":
            element = <Button className={props.className}>{props.children}</Button>
            break;
        case "pageItem":
            element = <Pagination.Item active={props.pageActive}>{props.children}</Pagination.Item>
            break;
        case "pagePrev":
            element = <Pagination.Prev active={props.pageActive}>{props.children}</Pagination.Prev>
            break;
        case "pageNext":
            element = <Pagination.Next active={props.pageActive}>{props.children}</Pagination.Next>
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