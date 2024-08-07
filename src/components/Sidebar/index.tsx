import { ReactNode } from "react"
import Archives from "./Archives"
import Intro from "./Intro"
import LatestPosts from "./LatestPosts"
import Tags from "./Tags"

function Sidebar({ host, children }: { host?: string, children?: ReactNode }) {
    return (
        <div className="d-flex flex-column gap-4">
            {children}
            {host === "home" && <Intro />}
            <Archives />
            <Tags />
            <LatestPosts />
        </div>
    )
}

export default Sidebar