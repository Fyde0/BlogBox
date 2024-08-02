import { queryOptions, useMutation, useQuery, UseQueryResult } from "@tanstack/react-query"
// 
import queryClient from "./queryClient"
import { FetchError, fetchHeaders } from "./FetchLib"
import IPost, { isIPost, isIPostArray } from "../interfaces/post"
import IPostsCountByMonth, { isIPostsCountByMonthArray } from "../interfaces/postsCountByMonth"
import config from "../config/config"

// 
// Query, get posts
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
        }
    }))
}

// 
// Query, get posts by date
// 
export function getPostsByDateQuery({ startDateEpochMs, endDateEpochMs }:
    { startDateEpochMs: number, endDateEpochMs: number }): UseQueryResult<IPost[]> {
    return useQuery(queryOptions({
        queryKey: ["postsByDate" + startDateEpochMs + endDateEpochMs],
        queryFn: async () => {
            return fetch(config.api.url + "/posts/byDateRange/" + startDateEpochMs + "/" + endDateEpochMs, {
                method: "GET",
                credentials: 'include',
            }).then(async (response) => {
                const data = await response.json()
                if (response.ok && isIPostArray(data)) {
                    return data
                }
                throw new FetchError(response, data.error)
            })
        }
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
        }
    }))
}

// 
// Query, get posts count by publish month
// 
export function getPostsAmountByMonth(): UseQueryResult<IPostsCountByMonth[]> {
    return useQuery(queryOptions({
        queryKey: ["postsCountByMonth"],
        queryFn: async () => {
            return fetch(config.api.url + "/posts/countByMonth", {
                method: "GET",
                credentials: 'include',
            }).then(async (response) => {
                const data = await response.json()
                if (response.ok && isIPostsCountByMonthArray(data)) {
                    return data
                }
                throw new FetchError(response, data.error)
            })
        },
        staleTime: 1000 * 60 * 60
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
        },
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['postsCountByMonth'] })
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
        },
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['postsCountByMonth'] })
    })
}