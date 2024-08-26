import { useState } from "react"
import { Navigate, useParams } from "react-router-dom"
import { Alert, Button, Card, Col, Row, Image, Container } from "react-bootstrap"
// 
import RouterLink from "../components/RouterLink"
import ErrorPage from "../components/errors/ErrorPage"
import CenteredModal from "../components/CenteredModal"
import Loading from "../components/Loading"
import Sidebar from "../components/Sidebar"
import Tag from "../components/Tag"
import Author from "../components/Sidebar/Author"
// 
import { FetchError } from "../api/FetchLib"
import { deletePostMutation, getPostByPostIdQuery } from "../api/posts"
import useUserStore from "../stores/user"

export function Component() {
    const { userInfo } = useUserStore()
    const { year, month, day, titleId } = useParams()
    const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false)

    // API calls setup

    const postId = year + "/" + month + "/" + day + "/" + titleId
    const getPost = getPostByPostIdQuery({ postId: postId })
    const deletePost = deletePostMutation()

    // API result checks

    if (deletePost.isSuccess) {
        return <Navigate to="/" />
    }

    if (getPost.isFetching) {
        return <Loading />
    }

    if (getPost.isError || !getPost.data) {
        if (getPost.error instanceof FetchError) {
            return <ErrorPage code={getPost.error?.response.status} />
        } else {
            throw getPost.error
        }
    }

    if (deletePost.isError && !(deletePost.error instanceof FetchError)) {
        throw deletePost.error
    }

    // Post setup

    const post = getPost.data

    let authorString = "Posted by " + post.author.username
    if (post.createdAt) {
        authorString += " on " + new Date(post.createdAt).toLocaleString(undefined, { dateStyle: "long", timeStyle: "short" })
    }
    if (post.updatedAt && post.createdAt !== post.updatedAt) {
        authorString += " (Updated " + new Date(post.updatedAt).toLocaleString(undefined, { dateStyle: "long", timeStyle: "short" }) + ")"
    }

    return (
        <>
            <Row className="d-flex flex-column">

                {/* Delete modal */}
                <CenteredModal
                    show={showDeleteModal}
                    onHide={() => setShowDeleteModal(false)}
                    variant="danger"
                    title="Confirmation"
                    confirmText="Delete"
                    confirmAction={
                        () => deletePost.mutate(
                            post._id,
                            { onSettled: () => setShowDeleteModal(false) }
                        )
                    }
                    loading={deletePost.isPending}
                >
                    Are you sure you want to delete this post?
                </CenteredModal>

                {/* Mutation error alert */}
                <Container className="d-flex flex-column">
                    {deletePost.isError && <Alert variant="danger" className="align-self-center">{deletePost.error.message}</Alert>}
                </Container>

            </Row>

            <Row className="gy-3">

                {/* Post */}
                <Col md="8">
                    <h1>{post.title}</h1>
                    <p className="text-body-secondary">{authorString}</p>
                    <hr className="my-4" />
                    {
                        post.pictureInView &&
                        <Image
                            src={import.meta.env.VITE_API_URL + "/thumbs/" + post.picture + "-512"}
                            width={300}
                            className="float-start border m-3"
                        />
                    }
                    <div className="lh-lg" dangerouslySetInnerHTML={{ __html: post.content }} />
                    {
                        post.tags.length > 0 &&
                        <div className="d-inline-flex flex-wrap">
                            {
                                post.tags.map((tag, i) => {
                                    return <Tag key={i}>{tag}</Tag>
                                })
                            }
                        </div>
                    }
                </Col>

                {/* Sidebar */}
                <Col>
                    <Sidebar>
                        {
                            userInfo._id === post.author._id &&
                            <Card className="border-primary">
                                <Card.Header>Post options</Card.Header>
                                <Card.Body className="d-flex gap-2">
                                    <RouterLink to="edit" type="button">Edit</RouterLink>
                                    <Button variant="danger" onClick={() => setShowDeleteModal(true)}>Delete</Button>
                                </Card.Body>
                            </Card>
                        }
                        <Author userInfo={post.author} />
                    </Sidebar>
                </Col>

            </Row>
        </>
    )
}