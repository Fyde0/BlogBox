import { ReactNode, useState } from "react";
import { Alert } from "react-bootstrap";

function SlidingAlert({ children, variant }: { children: ReactNode, variant?: string }) {
    const [show, setShow] = useState<boolean>(true)

    if (show) {
        return (
            <Alert
                variant={variant}
                className={"position-fixed start-50 top-0 shadow-sm z-3"}
                style={{ animation: "alert-animation 0.3s ease 0s 1 forwards normal", }}
                onClick={() => setShow(false)}
            >
                {children}
            </Alert>
        )
    }
}

export default SlidingAlert