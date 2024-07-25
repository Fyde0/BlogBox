import { StrictMode } from "react"
import ReactDOM from "react-dom/client"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
//
import "./assets/scss/styles.scss"
import routes from "./config/routes"
import config from "./config/config"

document.title = config.appName

const router = createBrowserRouter(routes)

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement)
root.render(
    <StrictMode>
        <RouterProvider router={router} />
    </StrictMode>
)