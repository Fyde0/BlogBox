import { Col, ListGroup, Row } from "react-bootstrap";
import { Outlet, useLocation } from "react-router-dom";
import RouterLink from "../../components/RouterLink";

export function Component() {
    const { pathname } = useLocation()
    // need pathname to rerender nav (see components/RouterLink)

    return (
        <Row className="gx-5 gy-3">
            <Col sm={3} className="d-flex flex-column gap-4">
                <ListGroup key={pathname + "-settings"}>
                    <RouterLink type="listGroupItem" to="settings">Blog settings</RouterLink>
                </ListGroup>
                <div>
                    <h6 className="ms-1">Home page layout</h6>
                    <ListGroup key={pathname + "-home"}>
                        <RouterLink type="listGroupItem" to="homePostPreviews">Style of post previews</RouterLink>
                    </ListGroup>
                </div>
            </Col>
            <Col>
                <Outlet />
            </Col>
        </Row>
    )
}