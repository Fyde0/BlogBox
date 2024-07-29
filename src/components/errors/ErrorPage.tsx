import { Container } from "react-bootstrap";

function ErrorPage({ code, message }: { code?: number, message?: string }) {

    let codeMessage = "Error"

    if (message === undefined) {
        switch (code) {
            case 404: codeMessage = "Not Found"; break
            case 500: codeMessage = "Server Error"; break
        }
    } else {
        codeMessage = message
    }

    return (
        <Container className="w-100 text-center mt-5">
            <h1>{code}</h1>
            <h2>{message === undefined ? codeMessage : message}</h2>
        </Container>
    )
}

export default ErrorPage