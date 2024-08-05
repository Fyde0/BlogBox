import { Pagination } from "react-bootstrap";
// 
import RouterLink from "../RouterLink";
import PaginatorLink from "./PaginatorLink";

function Paginator({ currentPage, totalPosts }: { currentPage: number, totalPosts?: number }) {

    const postsPerPage = 10

    if (!totalPosts || totalPosts <= postsPerPage) {
        return <></>
    }

    const totalPages = Math.ceil(totalPosts / postsPerPage)

    const ellipsisThreshold = 4
    const ellipsisEnabled = totalPages > ellipsisThreshold + 3

    let paginatorElements: JSX.Element[] = []

    if (ellipsisEnabled) {

        // start
        let startPaginatorElements: JSX.Element[] = []

        // if current page > 4 only show page 1, otherwise show 4
        for (let i = 1; i <= ellipsisThreshold; i++) {
            startPaginatorElements.push(<PaginatorLink key={i} page={i} active={i === currentPage} />)
            if (currentPage > ellipsisThreshold) { break }
        }

        // middle
        let middlePaginatorElements: JSX.Element[] = []
        middlePaginatorElements.push(<Pagination.Ellipsis key="ellipsis-1" />)

        // only show if current page is not too close to beginning or end (by 4)
        if (currentPage > ellipsisThreshold && currentPage <= (totalPages - (ellipsisThreshold))) {
            for (let i = currentPage - 1; i <= currentPage + 1; i++) {
                middlePaginatorElements.push(<PaginatorLink key={i} page={i} active={i === currentPage} />)
            }
            middlePaginatorElements.push(<Pagination.Ellipsis key="ellipsis-2" />)
        }

        // end
        let endPaginatorElements: JSX.Element[] = []

        // if current page is < then last page - 4 only show last page, otherwise show last 4 pages
        for (let i = totalPages; i > totalPages - ellipsisThreshold; i--) {
            endPaginatorElements.unshift(<PaginatorLink key={i} page={i} active={i === currentPage} />)
            if (currentPage < totalPages - ellipsisThreshold + 1) { break }
        }

        // 
        paginatorElements = [...startPaginatorElements, ...middlePaginatorElements, ...endPaginatorElements]

    } else {

        for (let i = 1; i <= totalPages; i++) {
            paginatorElements.push(<PaginatorLink key={i} page={i} active={i === currentPage} />)
        }

    }


    return (
        <Pagination className="justify-content-center">
            <RouterLink to={"../page/" + String(currentPage - 1)} type="pagePrev" />
            {paginatorElements}
            <RouterLink to={"../page/" + String(currentPage + 1)} type="pageNext" />
        </Pagination>
    )
}

export default Paginator