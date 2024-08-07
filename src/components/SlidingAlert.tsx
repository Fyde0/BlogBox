import { ReactNode } from "react";
import { Alert } from "react-bootstrap";

function SlidingAlert({ children, variant }: { children: ReactNode, variant?: string }) {
    return (
        <Alert
            variant={variant}
            // maybe sticky instead of fixed?
            className={"position-fixed start-50 shadow-sm"}
            style={{
                animation: "alert-animation 0.5s ease 0s 1 normal forwards"
            }}
        >
            {children}
        </Alert>
    )
}

export default SlidingAlert