import { ReactNode } from "react"
import { Button, Dropdown, ListGroup, Nav, Navbar, Pagination } from "react-bootstrap"
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

    // by default LinkContainer compares the current path with the link destination
    // to determine if the link should be active or not, but that doesn't work
    // for links in children routes, for example if you're in /account and
    // and click a link that goes to "settings", you end up in /account/settings
    // but LinkContainer compares "/account/settings" with "settings"
    // which returns false, this function checks the end of the location instead
    function isActive(_match: any, location: any) {
        const path = location.pathname.replace(/\/$/, "")
        return path.endsWith(props.to) ? true : false
    }

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
        case "dropdown":
            element = <Dropdown.Item active={false}>{props.children}</Dropdown.Item>
            break;
        case "listGroupItem":
            element = <ListGroup.Item action active={false}>{props.children}</ListGroup.Item>
            break;
        default:
            element = <Nav.Link active={false} className={props.className}>{props.children}</Nav.Link>
            break;
    }

    return (
        <LinkContainer to={props.to} isActive={isActive}>
            {element}
        </LinkContainer>
    )
}

export default RouterLink