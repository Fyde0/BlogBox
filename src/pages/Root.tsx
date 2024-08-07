import { Outlet } from "react-router-dom"
import { Container } from "react-bootstrap"
import { QueryClientProvider } from "@tanstack/react-query"
//
import queryClient from "../api/queryClient"
import NavigationBar from "../components/NavigationBar"
import Footer from "../components/Footer"
import useUserStore from "../stores/user"

export function Component() {
    const { userSettings } = useUserStore()

    // TODO Theme switcher, set in userStore
    document.documentElement.setAttribute("data-bs-theme", userSettings.theme)

    return (
        <QueryClientProvider client={queryClient}>
            <Container fluid className="d-flex flex-column justify-content-start gap-4 vh-100 p-0">
                <NavigationBar />
                <Container fluid style={{ maxWidth: "1280px" }}>
                    <Outlet />
                </Container>
                <Footer />
            </Container>
        </QueryClientProvider>
    )
}