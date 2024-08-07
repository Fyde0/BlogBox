import { ReactNode } from "react";
import { Alert } from "react-bootstrap";

function SlidingAlert({ children, className }: { children: ReactNode, className?: string }) {
    return (
        <Alert
            className={"position-fixed start-50 translate-middle shadow-sm " + className}
            style={{ animation: "alert-animation 0.3s ease 0s 1 normal forwards" }}
        >
            {children}
        </Alert>
    )
}

export default SlidingAlert