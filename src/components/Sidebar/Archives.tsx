import { Link } from "react-router-dom"
// 
import Loading from "../Loading"
import { getPostsCountByMonthQuery } from "../../api/posts"
import { Badge, ListGroup } from "react-bootstrap"

function Archives() {

    const archivesQuery = getPostsCountByMonthQuery()

    if (archivesQuery.isFetching) {
        return <Loading />
    }

    if (archivesQuery.error || !archivesQuery.data || archivesQuery.data.length === 0) {
        return <></>
    }

    return (
        <div>
            <h5>Archives</h5>
            <ListGroup>
                {
                    archivesQuery.data.map((obj, i) => {
                        const date = new Date(obj._id.year, obj._id.month - 1)
                        const month = date.toLocaleString('default', { month: "2-digit" })
                        const year = date.toLocaleString('default', { year: "numeric" })
                        // to respect Locale
                        const monthAndYear = date.toLocaleString('default', { year: "numeric", month: "long" })
                        return (
                            <ListGroup.Item key={i} className="d-flex gap-1">
                                <Link to={"/" + year + "/" + month}>
                                    {monthAndYear}
                                </Link>
                                <Badge>{obj.count}</Badge>
                            </ListGroup.Item>
                        )
                    })
                }
            </ListGroup>
        </div>
    )
}

export default Archives