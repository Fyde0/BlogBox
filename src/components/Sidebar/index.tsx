import { ReactNode } from "react"
import Archives from "./Archives"
import Intro from "./Intro"
import LatestPosts from "./LatestPosts"
import Tags from "./Tags"
import { useBlogSettings } from "../../api/blogSettings"

function Sidebar({ host, children }: { host?: string, children?: ReactNode }) {
    const blogSettings = useBlogSettings()

    return (
        <div className="d-flex flex-column gap-4">
            {children}
            {
                host === "home" &&
                blogSettings.data?.homeLayout.introCard &&
                <Intro />
            }
            <Archives />
            <Tags />
            <LatestPosts />
        </div>
    )
}

export default Sidebar