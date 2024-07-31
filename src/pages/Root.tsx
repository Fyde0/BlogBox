
import { Outlet } from "react-router-dom"
import { Container } from "react-bootstrap"
import { QueryClientProvider } from "@tanstack/react-query"
//
import queryClient from "../api/queryClient"
import NavigationBar from "../components/navigation/NavigationBar"

export function Component() {

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