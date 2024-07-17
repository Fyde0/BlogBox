import { StrictMode } from "react"
import ReactDOM from "react-dom/client"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
// Pages and Components

// Config
import config from "./config/config"
import routes from "./config/routes"

document.title = config.title

const router = createBrowserRouter(routes);

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement)
root.render(
    <StrictMode>
        <RouterProvider router={router} />
    </StrictMode>
)