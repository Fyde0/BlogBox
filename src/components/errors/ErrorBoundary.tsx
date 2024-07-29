function ErrorBoundary() {

    // TODO Get theme from user store safely
    document.documentElement.setAttribute("data-bs-theme", "dark")

    return (
        <div className="container text-center h4 mt-5 pt-5">
            <p>Oops... something broke.</p>
            <a className="h5" href="/">Go to home page</a>
        </div>
    )
}

export default ErrorBoundary