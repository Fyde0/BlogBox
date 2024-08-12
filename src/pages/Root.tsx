import { Outlet } from "react-router-dom"
import { Container } from "react-bootstrap"
//
import NavigationBar from "../components/NavigationBar"
import Footer from "../components/Footer"
import useUserStore from "../stores/user"
import useBlogSettingsStore from "../stores/blogSettings"
import Loading from "../components/Loading"

export function Component() {
    const { userSettings } = useUserStore()
    const { blogSettings, fetching } = useBlogSettingsStore()

    if (fetching) {
        // TODO make this better
        return <Loading />
    }

    switch (blogSettings.theme) {
        case "minty":
            import("../assets/scss/minty/styles.scss")
            break;
        case "flatly":
            import("../assets/scss/flatly/styles.scss")
            break;
        case "cosmo":
            import("../assets/scss/cosmo/styles.scss")
            break;
        default:
            import("../assets/scss/minty/styles.scss")
            break;
    }

    document.documentElement.setAttribute("data-bs-theme", userSettings.theme)

    return (
        <Container fluid className="d-flex flex-column justify-content-start gap-4 vh-100 p-0">
            <NavigationBar />
            <Container fluid style={{ maxWidth: "1000px" }}>
                <Outlet />
            </Container>
            <Footer />
        </Container>
    )
}