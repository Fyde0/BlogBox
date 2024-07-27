import { Container } from "react-bootstrap"
import "../assets/scss/styles.scss"

function ErrorBoundary() {

    // TODO Get theme from user store safely
    document.documentElement.setAttribute("data-bs-theme", "dark")

    return (
        <Container fluid="true text-center h4 mt-5 pt-5">
            <p>Oops... something broke.</p>
            <a className="h5" href="/">Go to home page</a>
        </Container>
    )
}

export default ErrorBoundary