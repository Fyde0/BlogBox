import Archives from "./Archives"
import Intro from "./Intro"
import LatestPosts from "./LatestPosts"
import Tags from "./Tags"

function Sidebar() {
    return (
        <div className="d-flex flex-column gap-4">
            <Intro />
            <Archives />
            <Tags />
            <LatestPosts />
        </div>
    )
}

export default Sidebar