import { getTagsQuery } from "../../api/posts"
import Loading from "../Loading"
import Tag from "../Tag"

function Tags() {

    const tagsQuery = getTagsQuery()

    if (tagsQuery.isFetching) {
        return <Loading />
    }

    if (tagsQuery.error || !tagsQuery.data || tagsQuery.data.length === 0) {
        return <></>
    }

    const tags = tagsQuery.data

    return (
        <div>
            <h5>Tags</h5>
            <div className="d-inline-flex align-items-center flex-wrap gap-1">
                {
                    tags.map((tag, i) => {
                        return (
                            <Tag
                                key={i}
                                link={"/tag/" + tag}
                            >
                                {tag}
                            </Tag>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default Tags