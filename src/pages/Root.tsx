
import { Outlet } from "react-router-dom"
import { Container } from "react-bootstrap"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
// Components
import NavigationBar from "../components/NavigationBar"

function Root() {
    const queryClient = new QueryClient()

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

export default Root