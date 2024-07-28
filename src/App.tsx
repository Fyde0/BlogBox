import { StrictMode } from "react"
import ReactDOM from "react-dom/client"
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom"
//
import "./assets/scss/styles.scss"
import ProtectedRoute from "./components/ProtectedRoute"
import ErrorBoundary from "./components/errors/ErrorBoundary"
import IRoute from "./interfaces/route"
import routes from "./config/routes"
import config from "./config/config"

document.title = config.appName

// Generates Route objects recursively
// Handles protected routes
function mapRoutes(routes: IRoute[]) {
    return routes.map((route: IRoute, i) => {
        let newRoute =
            <Route
                key={i}
                path={route.path}
                lazy={route.lazy}
            >
                {route.children && mapRoutes(route.children)}
            </Route>
        if (route.auth) {
            return (
                <Route key={"auth-" + i} element={<ProtectedRoute />}>
                    {newRoute}
                </Route>
            )
        } else return newRoute
    })
}

const router = createBrowserRouter(createRoutesFromElements(
    <Route
        path="/"
        lazy={() => import("./pages/Root")}
        // Uncaught errors go here
        errorElement={<ErrorBoundary />}
    >
        {mapRoutes(routes)}
    </Route>
))

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement)
root.render(
    <StrictMode>
        <RouterProvider router={router} />
    </StrictMode>
)