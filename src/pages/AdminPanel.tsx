import { Col, ListGroup, Row } from "react-bootstrap";
import { Outlet, useLocation } from "react-router-dom";
import RouterLink from "../components/RouterLink"

export function Component() {
    const { pathname } = useLocation()
    // need pathname to rerender nav (see components/RouterLink)

    return (
        <Row className="gx-5 gy-3">
            <Col sm={3}>
                <ListGroup key={pathname}>
                    <RouterLink type="listGroupItem" to="">Blog settings</RouterLink>
                </ListGroup>
            </Col>
            <Col>
                <Outlet />
            </Col>
        </Row>
    )
}