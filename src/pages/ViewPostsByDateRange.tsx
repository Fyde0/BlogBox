import { Col, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { z } from "zod";
// 
import ErrorPage from "../components/errors/ErrorPage";
import Loading from "../components/Loading";
import PostsList from "../components/PostsList";
import Sidebar from "../components/Sidebar";
import { getAllPostsQuery } from "../api/posts";
import { FetchError } from "../api/FetchLib";

export function Component() {
    const { year, month, day, page } = useParams()

    let currentPage = Number(page)

    if (!page || currentPage < 1) currentPage = 1

    const dateValidation = z
        .object({
            year: z.coerce.number().min(1970),
            month: z.coerce.number().min(1).max(12).default(1).catch(1),
            day: z.coerce.number().min(1).max(31).default(1).catch(1)
        })
        .safeParse({ year, month, day })

    if (!dateValidation.success) {
        return <ErrorPage code={404} />
    }

    const startDate = new Date(
        dateValidation.data.year,
        dateValidation.data.month - 1, // January is 0
        dateValidation.data.day
    )

    // validate day in month, if wrong set last day of month 
    // ex. February 31 becomes February 28 (or 29)
    if (startDate.getDate() !== dateValidation.data.day) {
        startDate.setMonth(dateValidation.data.month + 1)
        startDate.setDate(0) // 0 means -1 day
    }

    const endDate = new Date(startDate)
    let title = ""
    // If searching for only year, endDate = end of year
    if (!month && !day) {
        endDate.setFullYear(startDate.getFullYear() + 1)
        title = "Year: " + startDate.getFullYear()
    }
    // If searching for year and month, endDate = end of month
    if (month && !day) {
        endDate.setMonth(startDate.getMonth() + 1)
        title = "Month: " +
            startDate.toLocaleString("en-US", { year: "numeric", month: "long" })
    }
    // If searching for specific day, endDate = end of day
    if (month && day) {
        endDate.setDate(startDate.getDate() + 1)
        title = "Day: " +
            startDate.toLocaleString("en-US", { year: "numeric", month: "long", day: "numeric" })
    }
    // Previous day at 23:59:59
    endDate.setSeconds(-1)

    const startDateEpochMs = startDate.getTime()
    const endDateEpochMs = endDate.getTime()

    const getPosts = getAllPostsQuery({ startDate: startDateEpochMs, endDate: endDateEpochMs, page: currentPage })

    if (getPosts.isFetching) {
        return <Loading />
    }

    if (getPosts.isError) {
        if (getPosts.error instanceof FetchError) {
            return <ErrorPage code={getPosts.error?.response.status} />
        } else {
            throw getPosts.error
        }
    }

    const posts = getPosts.data?.posts
    const postsCount = getPosts.data?.totalCount

    return (
        <Row>
            <Col lg="8" className="d-flex flex-column justify-content-start gap-3">
                <PostsList
                    title={title}
                    posts={posts}
                    totalPosts={postsCount}
                    currentPage={currentPage}
                />
            </Col>
            <Col>
                <Sidebar />
            </Col>
        </Row>
    )

}