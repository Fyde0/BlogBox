import { useParams } from "react-router-dom"
import { Container, Spinner } from "react-bootstrap"
import { useQuery, queryOptions } from "@tanstack/react-query"
import axios from "axios"
// 
import ErrorCode from "../components/errors/ErrorMessage"
import { isIPost } from "../interfaces/post"
import config from "../config/config"

export function Component() {
    const { year, month, day, titleId } = useParams()
    const postId = year + "/" + month + "/" + day + "/" + titleId

    const query = useQuery(queryOptions({
        queryKey: [postId],
        queryFn: async () => {
            return await axios.get(config.api.url + "/posts/byId/" + postId)
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

    if (!query.data) {
        return <ErrorCode code={404} />
    }

    if (query.error || !isIPost(query.data)) {
        return <ErrorCode code={500} />
    }

    const post = query.data
    let authorString = "Posted by " + post.author.username
    if (post.createdAt) {
        authorString += " on " + new Date(post.createdAt).toLocaleString()
    }

    return (
        <Container>
            <h1>{post.title}</h1>
            <p className="text-body-secondary">{authorString}</p><hr className="my-4" />
            <Container dangerouslySetInnerHTML={{ __html: post.content }} />
        </Container>
    )
}