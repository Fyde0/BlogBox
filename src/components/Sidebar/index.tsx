import { ReactNode } from "react"
import Archives from "./Archives"
import LatestPosts from "./LatestPosts"
import Tags from "./Tags"
import { useBlogSettings } from "../../api/blogSettings"
import IBlogSettings from "../../interfaces/blogSettings"

function Sidebar({ children, overrideLayout }: { children?: ReactNode, overrideLayout?: IBlogSettings["sidebarLayout"] }) {
    const blogSettings = useBlogSettings()

    let sidebarLayout = blogSettings.data?.sidebarLayout
    if (overrideLayout) {
        sidebarLayout = overrideLayout
    }

    return (
        <div className="d-flex flex-column gap-4">
            {children}
            {sidebarLayout?.showArchives && <Archives />}
            {sidebarLayout?.showTags && <Tags />}
            {sidebarLayout?.showLatestPosts && <LatestPosts />}
        </div>
    )
}

export default Sidebar