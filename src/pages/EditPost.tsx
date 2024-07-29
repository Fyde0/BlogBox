import { queryOptions, useQuery } from "@tanstack/react-query"
import { useParams } from "react-router-dom"
// 
import Loading from "../components/Loading"
import ErrorPage from "../components/errors/ErrorPage"
import { isIPost } from "../interfaces/post"
import config from "../config/config"
import PostEditor from "../components/editor/PostEditor"

export function Component() {
    const { year, month, day, titleId } = useParams()

    const postId = year + "/" + month + "/" + day + "/" + titleId

    // TOFIX doesn't run when refreshing
    const getPost = useQuery(queryOptions({
        queryKey: [postId],
        queryFn: async () => {
            return await axios.get(config.api.url + "/posts/byPostId/" + postId)
                .then((res: any) => res.data)
        },
        retry: 1,
    }))

    console.log(getPost.data)

    // isFetching is for initial load and also refetching
    if (getPost.isFetching) {
        return <Loading />
    }

    if (getPost.isError && !getPost.data) {
        return <ErrorPage code={404} />
    }

    if (getPost.data && !isIPost(getPost.data)) {
        return <ErrorPage code={500} />
    }

    return (
        <PostEditor postToUpdate={getPost.data} />
    )

}