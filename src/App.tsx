import { StrictMode } from "react"
import ReactDOM from "react-dom/client"
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom"
import { QueryClientProvider } from "@tanstack/react-query"
//
import ProtectedRoute from "./components/ProtectedRoute"
import ErrorBoundary from "./components/errors/ErrorBoundary"
import queryClient from "./api/queryClient"
import IRoute from "./interfaces/route"
import routes from "./config/routes"

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
        if (route.auth || route.admin) {
            return (
                <Route
                    key={"auth-" + i}
                    element={<ProtectedRoute admin={route.admin} />}
                >
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
),
    { basename: import.meta.env.BASE_URL }
)

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement)
root.render(
    <StrictMode>
        <QueryClientProvider client={queryClient}>
            <RouterProvider router={router} />
        </QueryClientProvider>
    </StrictMode>
)