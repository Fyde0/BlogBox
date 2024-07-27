
import { Outlet } from "react-router-dom"
import { Container } from "react-bootstrap"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
//
import NavigationBar from "../components/NavigationBar"

export function Component() {
    const queryClient = new QueryClient()

    // TODO Theme switcher, set in userStore
    document.documentElement.setAttribute("data-bs-theme", "dark")

    return (
        <QueryClientProvider client={queryClient}>
            {/* Main container */}
            <Container fluid="true">
                <NavigationBar />
                <Container style={{ maxWidth: "1280px" }}>
                    <Outlet />
                </Container>
            </Container>
        </QueryClientProvider>
    )
}