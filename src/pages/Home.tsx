import { queryOptions, useQuery } from "@tanstack/react-query"
import { Col, Container, Row, Spinner } from "react-bootstrap"
import axios from "axios"
// 
import PostPreview from "../components/PostPreview"
import ErrorPage from "../components/errors/ErrorPage"
import config from "../config/config"
import IPost from "../interfaces/post"

export function Component() {

    const query = useQuery(queryOptions({
        queryKey: ["homePosts"],
        queryFn: async () => {
            return await axios.get(config.api.url + "/posts?amount=10")
                .then((res: any) => res.data)
        },
        retry: 1
    }))

    if (query.isLoading) {
        return (
            <Container className="d-flex justify-content-center mt-5">
                <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
            </Container>
        )
    }

    if (query.error) {
        return <ErrorPage code={500} />
    }

    const posts: IPost[] = query.data

    if (posts.length === 0) {
        return (
            <Container className="text-center">There are no posts yet.</Container>
        )
    }

    return (
        <Row>
            <Col lg="8">
                {
                    posts.map((post, i) => {

                        return (
                            <Container key={i} className="mb-3">
                                <PostPreview post={post} />
                            </Container>
                        )
                    })
                }
            </Col>
            <Col>
                Side bar
            </Col>
        </Row>
    )
}