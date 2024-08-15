import { Outlet } from "react-router-dom"
import { Container } from "react-bootstrap"
//
import ThemeLoader from "../components/ThemeLoader"
import NavigationBar from "../components/NavigationBar"
import Footer from "../components/Footer"
import Loading from "../components/Loading"
import useUserStore from "../stores/user"
import { useBlogSettings } from "../api/blogSettings"

export function Component() {
    const { userSettings } = useUserStore()
    const blogSettings = useBlogSettings()

    document.title = blogSettings.data!.title

    if (blogSettings.isFetching) {
        return <Loading noTheme={true} colorMode={userSettings.theme} />
    }

    if (blogSettings.isError || !blogSettings.data) {
        throw blogSettings.error
    }

    return (
        <ThemeLoader theme={blogSettings.data.theme} colorMode={userSettings.theme}>
            <Container fluid className="d-flex flex-column justify-content-start gap-4 vh-100 p-0">
                <NavigationBar />
                <Container fluid style={{ maxWidth: "1280px" }}>
                    <Outlet />
                </Container>
                <Footer />
            </Container>
        </ThemeLoader>
    )
}