import { useParams } from "react-router-dom";
import { Col, Container, Row } from "react-bootstrap"
import { useQuery, queryOptions } from "@tanstack/react-query"

export function Component() {
    const { postId } = useParams();

    async function fakeFetch(_key: string) {
        return new Promise((_resolve, reject) => {
            console.log("promise")
            setTimeout(() => {
                reject(new Error());
            }, 2000)
        })
    }

    const query = useQuery(queryOptions({
        queryKey: [postId],
        queryFn: () => fakeFetch(postId as string),
        retry: 0,
        throwOnError: true
    }))

    if (query.isLoading) {
        return (
            <main>Loading</main>
        )
    }

    if (query.error) {
        return (
            <main>error</main>
        )
    }

    return (
        <Container>
            <Row>
                {/* col-8 means 8/12 width */}
                <Col className="col-8">
                    <h1 className="display-4">Title</h1>
                    <p className="text-body-secondary">Posted by...</p>
                    <img className="w-100" src="/src/assets/pics/placeh1.jpg"></img>
                </Col>
                <Col>
                    <h1 className="display-6">Right</h1>
                    <p className="text-body-secondary">Right text.<br />Information and stuff.</p>
                </Col>
            </Row>
        </Container>
    )
}