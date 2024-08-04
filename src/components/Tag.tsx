import { ReactNode } from "react";
import { Badge } from "react-bootstrap";

function Tag({ children, onRemove }: { children: ReactNode, onRemove?: Function }) {
    return (
        <Badge
            className="d-flex align-items-center gap-1 me-1"
            style={{ cursor: "default", marginTop: "6px" }}
        >
            <span>#{children}</span>
            {
                onRemove &&
                <i
                    className="remove-tag-icon fa-solid fa-xmark"
                    style={{ cursor: "pointer" }}
                    onClick={() => onRemove()}
                />
            }
        </Badge>
    )
}

export default Tag