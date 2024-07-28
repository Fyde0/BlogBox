
import { Outlet } from "react-router-dom"
import { Container } from "react-bootstrap"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
//
import NavigationBar from "../components/navigation/NavigationBar"

export function Component() {
    // React query setup and options
    const queryClient = new QueryClient({
        defaultOptions: {
            queries: { refetchOnWindowFocus: false }
        }
    })

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