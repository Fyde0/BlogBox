import { ReactNode, useState } from "react";
import IBlogSettings from "../interfaces/blogSettings";
import Loading from "./Loading";
import IUserSettings from "../interfaces/userSettings";

function ThemeLoader({ children, theme, colorMode }:
    {
        children: ReactNode,
        theme: IBlogSettings["theme"],
        colorMode: IUserSettings["theme"]
    }) {
    const [loading, setLoading] = useState<boolean>(true)

    async function loadTheme(theme: IBlogSettings["theme"]) {
        switch (theme) {
            case "minty":
                await import("../assets/scss/minty/styles.scss")
                break;
            case "flatly":
                await import("../assets/scss/flatly/styles.scss")
                break;
            case "cosmo":
                await import("../assets/scss/cosmo/styles.scss")
                break;
            default:
                await import("../assets/scss/minty/styles.scss")
                break;
        }
        setLoading(false)
    }

    if (loading) {
        loadTheme(theme)
        return <Loading noTheme={true} colorMode={colorMode} />
    }

    // dark / light
    document.documentElement.setAttribute("data-bs-theme", colorMode)

    return <>{children}</>
}

export default ThemeLoader