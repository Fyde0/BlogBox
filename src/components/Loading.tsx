import { Container, Spinner } from "react-bootstrap"

function Loading({ noTheme, colorMode }: { noTheme?: boolean, colorMode?: "light" | "dark" }) {

    // Spinner for when the theme is not yet loaded
    if (noTheme) {

        let backgroundColor = "rgb(33, 37, 41)"
        let spinnerColor = "rgb(222, 226, 230)"
        if (colorMode === "light") {
            backgroundColor = "white"
            spinnerColor = "rgb(33, 37, 41)"
        }

        return (
            <div style={{
                backgroundColor,
                height: "100vh",
                width: "100vw",
                paddingTop: "8px",
                display: "flex",
                justifyContent: "center"
            }}>
                <style>
                    {
                        "@keyframes rotation { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); }}"
                    }
                </style>
                <div
                    style={{
                        width: "2rem",
                        height: "2rem",
                        border: "0.25rem solid " + spinnerColor,
                        borderBottomColor: "transparent",
                        borderRadius: "50%",
                        boxSizing: "border-box",
                        animation: "rotation 0.75s linear infinite"
                    }}
                >
                    {/* Hidden status for screen readers */}
                    <div
                        style={{
                            width: "1px",
                            height: "1px",
                            padding: "0",
                            margin: "-1px",
                            overflow: "hidden",
                            border: "0"
                        }}
                    >
                        Loading...
                    </div>
                </div>
            </div >
        )
    }

    // Normal bootstrap spinner
    return (
        <Container className="d-flex justify-content-center">
            <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
            </Spinner>
        </Container>
    )
}

export default Loading