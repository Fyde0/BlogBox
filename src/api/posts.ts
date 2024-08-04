import { queryOptions, useMutation, useQuery, UseQueryResult } from "@tanstack/react-query"
// 
import queryClient from "./queryClient"
import { FetchError, fetchHeaders } from "./FetchLib"
import IPost, { isIPost } from "../interfaces/post"
import getAllPostsQueryProps from "./interfaces/getAllPostsQueryProps"
import IAllPosts, { isIAllPosts } from "./interfaces/allPosts"
import IPostsCountByMonth, { isIPostsCountByMonthArray } from "./interfaces/postsCountByMonth"
import config from "../config/config"

/**
 * Gets all posts (optionally by page, with date range and sort)
 *
 * @param {number} [params.page=1] Page number.
 * @param {startDate} [params.startDate=""] Start date in ms since epoch.
 * @param {endDate} [params.endDate=""] End date in ms since epoch.
 * @param {string} [params.sort="desc"] Sort order, asc or desc.
 * @returns {UseQueryResult<IAllPosts>} Posts and total count for pagination.
 */
export function getAllPostsQuery({ page = 1, startDate = "", endDate = "", sort = "desc" }: getAllPostsQueryProps): UseQueryResult<IAllPosts> {
    const count = 10
    const skip = count * (page - 1)
    const apiUrl = config.api.url +
        "/posts?startDate=" + startDate + "&endDate=" + endDate +
        "&sort=" + sort + "&skip=" + skip + "&amount=" + count

    return useQuery(queryOptions({
        queryKey: ["homePostsPage", startDate, endDate, sort, page],
        queryFn: async () => {
            console.log("fetch all")
            return fetch(apiUrl, {
                method: "GET",
                credentials: 'include',
            }).then(async (response) => {
                const data = await response.json()
                if (response.ok && isIAllPosts(data)) {
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
            console.log("fetch postId")
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
export function getPostsCountByMonth(): UseQueryResult<IPostsCountByMonth[]> {
    return useQuery(queryOptions({
        queryKey: ["postsCountByMonth"],
        queryFn: async () => {
            console.log("fetch count")
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
        }
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
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ['postsCountByMonth'] })
            queryClient.invalidateQueries({ queryKey: [data] })
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
        },
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['postsCountByMonth'] })
    })
}