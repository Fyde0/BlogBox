import { queryOptions, useMutation, useQuery, UseQueryResult } from "@tanstack/react-query"
// 
import FetchError from "./FetchError"
import fetchHeaders from "./fetchHeaders"
import IPost, { isIPost, isIPostArray } from "../interfaces/post"
import config from "../config/config"

// 
// Query, get posts by page
// 
export function getPostsQuery({ page }: { page: number }): UseQueryResult<IPost[]> {
    const amount = 10
    const skip = amount * (page - 1)
    return useQuery(queryOptions({
        queryKey: ["homePostsPage" + page],
        queryFn: async () => {
            return fetch(config.api.url + "/posts?amount=" + amount + "&skip=" + skip, {
                method: "GET",
                credentials: 'include',
            }).then(async (response) => {
                const data = await response.json()
                if (response.ok && isIPostArray(data)) {
                    return data
                }
                throw new FetchError(response, data.error)
            })
        },
        retry: 1
    }))
}

// 
// Query, get post by postId
// 
export function getPostByPostIdQuery({ postId }: { postId: string }): UseQueryResult<IPost> {
    return useQuery(queryOptions({
        queryKey: [postId],
        queryFn: async () => {
            return fetch(config.api.url + "/posts/byPostId/" + postId, {
                method: "GET",
                credentials: 'include',
            }).then(async (response) => {
                const data = await response.json()
                if (response.ok && isIPost(data)) {
                    return data
                }
                throw new FetchError(response, data.error)
            })
        },
        retry: 1
    }))
}

// 
// Mutation, submit post (create and update)
// 
export function submitPostMutation({ updating }: { updating: boolean }) {
    return useMutation({
        mutationFn: async (post: IPost) => {
            let apiUrl = config.api.url + "/posts/create"
            let method = "POST"
            if (updating) {
                apiUrl = config.api.url + "/posts/update/" + post._id
                method = "PATCH"
            }
            return fetch(apiUrl, {
                method: method,
                headers: fetchHeaders,
                body: JSON.stringify(post),
                credentials: 'include',
            }).then(async (response) => {
                const data = await response.json()
                if (response.ok && typeof data === "string") {
                    return data
                }
                throw new FetchError(response, data.error)
            })
        }
    })
}


// 
// Mutation, delete post by _id
// 
export function deletePostMutation() {
    return useMutation({
        mutationFn: async (_id: string | undefined) => {
            return fetch(config.api.url + "/posts/delete/" + _id, {
                method: "DELETE",
                credentials: 'include',
            }).then(async (response) => {
                const data = await response.json()
                if (response.ok) {
                    return data
                }
                throw new FetchError(response, data.error)
            })
        }
    })
}