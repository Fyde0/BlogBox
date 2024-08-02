import { Col, Container, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { z } from "zod";
// 
import ErrorPage from "../components/errors/ErrorPage";
import Loading from "../components/Loading";
import PostsList from "../components/PostsList";
import Sidebar from "../components/Sidebar";
import { getPostsByDateQuery } from "../api/posts";
import { FetchError } from "../api/FetchLib";

export function Component() {
    const { year, month, day } = useParams()

    const dateValidation = z
        .object({
            year: z.coerce.number().min(1970),
            month: z.coerce.number().min(1).max(12).default(1).catch(1),
            day: z.coerce.number().min(1).max(31).default(1).catch(1)
        })
        .safeParse({ year, month, day })

    if (!dateValidation.success) {
        return <ErrorPage code={500} />
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

    const getPosts = getPostsByDateQuery({ startDateEpochMs, endDateEpochMs })

    if (getPosts.isFetching) {
        return <Loading />
    }

    if (getPosts.isError || !getPosts.data) {
        if (getPosts.error instanceof FetchError) {
            return <ErrorPage code={getPosts.error?.response.status} />
        } else {
            throw getPosts.error
        }
    }

    const posts = getPosts.data

    if (posts.length === 0) {
        return (
            <Container className="text-center">No posts found.</Container>
        )
    }

    return (
        <Row>
            <Col lg="8">
                <PostsList title={title} posts={posts} />
            </Col>
            <Col>
                <Sidebar />
            </Col>
        </Row>
    )

}