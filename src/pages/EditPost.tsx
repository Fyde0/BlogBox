import { queryOptions, useQuery } from "@tanstack/react-query"
import { useParams } from "react-router-dom"
import axios from "axios"
// 
import Loading from "../components/Loading"
import ErrorPage from "../components/errors/ErrorPage"
import { isIPost } from "../interfaces/post"
import config from "../config/config"
import PostEditor from "../components/editor/PostEditor"
import useUserStore from "../stores/user"

export function Component() {
    const { userInfo } = useUserStore()
    const { year, month, day, titleId } = useParams()

    const postId = year + "/" + month + "/" + day + "/" + titleId

    const getPost = useQuery(queryOptions({
        queryKey: [postId],
        queryFn: async () => {
            return await axios.get(config.api.url + "/posts/byPostId/" + postId)
                .then((res: any) => res.data)
        },
        retry: 1,
    }))

    // isFetching is for initial load and also refetching
    if (getPost.isFetching) {
        return <Loading />
    }

    if (getPost.isError && !getPost.data) {
        return <ErrorPage code={404} />
    }

    if (getPost.isError || getPost.data && !isIPost(getPost.data)) {
        return <ErrorPage code={500} />
    }

    // Only the owner can edit the post
    if (getPost.data.author._id !== userInfo._id) {
        return <ErrorPage code={403} />
    }

    return (
        <PostEditor postToUpdate={getPost.data} />
    )

}