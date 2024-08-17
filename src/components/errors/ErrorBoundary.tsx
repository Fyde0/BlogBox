import { useRouteError } from "react-router-dom";
import useUserStore from "../../stores/user";

function ErrorBoundary() {
    let error = useRouteError()
    const { userSettings } = useUserStore()
    console.log(error)

    let colorMode = "light"
    if (userSettings) {
        colorMode = userSettings.theme
    }

    let backgroundColor = "rgb(33, 37, 41)"
    let textColor = "rgb(222, 226, 230)"
    let aColor = "rgb(128, 139, 150)"
    if (colorMode === "light") {
        backgroundColor = "white"
        textColor = "rgb(33, 37, 41)"
        aColor = "rgb(31, 102, 182)"
    }

    document.documentElement.setAttribute("data-bs-theme", colorMode)

    return (
        // theme agnostic
        <div
            style={{
                fontFamily: "Montserrat, -apple-system, system-ui, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
                height: "100vh",
                width: "100vw",
                backgroundColor,
                color: textColor,
                textAlign: "center",
                paddingTop: "25%"
            }}
        >
            <style>
                {"a { color: " + aColor + "; } a:visited { color: " + aColor + "; }"}
            </style>
            <h1>Oops...<br />Something broke.</h1>
            <a href="/"><h2>Go to home page</h2></a>
        </div>
    )
}

export default ErrorBoundary