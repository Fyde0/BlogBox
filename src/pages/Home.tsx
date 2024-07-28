import { queryOptions, useQuery } from "@tanstack/react-query"
import { Container, Spinner } from "react-bootstrap"
import axios from "axios"
// 
import PostPreview from "../components/PostPreview"
import config from "../config/config"
import IPost from "../interfaces/post"

export function Component() {

    const query = useQuery(queryOptions({
        queryKey: ["posts"],
        queryFn: async () => {
            return await axios.get(config.api.url + "/posts")
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
        // there's nothing here
    }

    if (query.error) {
        console.log(query.error)
        // return <Navigate to="/500" />
    }

    const posts: IPost[] = query.data

    if (posts.length === 0) {
        return (
            <Container>There are no posts yet.</Container>
        )
    }

    // TODO post order, limit, pages

    return (
        <Container>
            {
                posts.map((post, i) => {
                    return <PostPreview post={post} key={i} />
                })
            }
        </Container>
    )
}