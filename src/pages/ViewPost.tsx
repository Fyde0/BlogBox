import { useParams } from "react-router-dom"
import { Button, Card, Col, Container, Row } from "react-bootstrap"
import { useQuery, queryOptions } from "@tanstack/react-query"
import axios from "axios"
// 
import RouterLink from "../components/navigation/RouterLink"
import ErrorPage from "../components/errors/ErrorPage"
import Loading from "../components/Loading"
import { isIPost } from "../interfaces/post"
import useUserStore from "../stores/user"
import config from "../config/config"

export function Component() {
    const { userInfo } = useUserStore()
    const { year, month, day, titleId } = useParams()
    const postId = year + "/" + month + "/" + day + "/" + titleId

    const query = useQuery(queryOptions({
        queryKey: [postId],
        queryFn: async () => {
            return await axios.get(config.api.url + "/posts/byPostId/" + postId)
                .then((res: any) => res.data)
        },
        retry: 1
    }))

    // isFetching is for initial load and also refetching
    if (query.isFetching) {
        return <Loading />
    }

    if (!query.data) {
        return <ErrorPage code={404} />
    }

    if (query.error || !isIPost(query.data)) {
        return <ErrorPage code={500} />
    }

    const post = query.data
    let authorString = "Posted by " + post.author.username
    if (post.createdAt) {
        authorString += " on " + new Date(post.createdAt).toLocaleString()
    }

    return (
        <Row>
            <Col lg="8">
                <Container>
                    <h1>{post.title}</h1>
                    <p className="text-body-secondary">{authorString}</p><hr className="my-4" />
                    <Container dangerouslySetInnerHTML={{ __html: post.content }} />
                </Container>
            </Col>
            <Col>
                {userInfo._id === post.author._id &&
                    <Card className="border-primary">
                        <Card.Header>Post options</Card.Header>
                        <Card.Body className="d-flex gap-2">
                            <RouterLink to="edit" type="button">Edit</RouterLink>
                            <Button variant="danger">Delete</Button>
                        </Card.Body>
                    </Card>
                }
            </Col>
        </Row>
    )
}