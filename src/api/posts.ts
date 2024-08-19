import { queryOptions, useMutation, useQuery, UseQueryResult } from "@tanstack/react-query"
// 
import queryClient from "./queryClient"
import { FetchError } from "./FetchLib"
import IPost, { isIPost } from "../interfaces/post"
import IGetAllPostsQueryProps from "./interfaces/getAllPostsQueryProps"
import IAllPosts, { isIAllPosts } from "./interfaces/allPosts"
import IPostsCountByMonth, { isIPostsCountByMonthArray } from "./interfaces/postsCountByMonth"

/**
 * Gets all posts (optionally by page, with date range and sort)
 *
 * @param {number} [params.page=1] Page number.
 * @param {number} [params.postsPerPage=10] How many posts in one page.
 * @param {number | string} [params.startDate=""] Start date in ms since epoch.
 * @param {number | string} [params.endDate=""] End date in ms since epoch.
 * @param {string[]} [params.tags=[]] Array of tags
 * @param {string} [params.sort="desc"] Sort order, asc or desc.
 * @returns {UseQueryResult<IAllPosts>} Posts and total count for pagination.
 */
export function getAllPostsQuery(
    {
        // defaults
        page = 1,
        postsPerPage = 10,
        startDate = "",
        endDate = "",
        tags = [],
        sort = "desc"
    }: IGetAllPostsQueryProps): UseQueryResult<IAllPosts> {
    const count = postsPerPage
    const skip = count * (page - 1)
    const API_URL = import.meta.env.VITE_API_URL +
        "/posts" +
        "?startDate=" + startDate + "&endDate=" + endDate +
        "&tags=" + tags.join(",") +
        "&sort=" + sort + "&skip=" + skip + "&count=" + count
    return useQuery(queryOptions({
        queryKey: ["allPosts", startDate, endDate, tags, sort, page, postsPerPage],
        queryFn: async () => {
            return fetch(API_URL, {
                method: "GET",
                credentials: "include",
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
        queryKey: ["postById", postId],
        queryFn: async () => {
            return fetch(import.meta.env.VITE_API_URL + "/posts/byPostId/" + postId, {
                method: "GET",
                credentials: "include",
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
export function getPostsCountByMonthQuery(): UseQueryResult<IPostsCountByMonth[]> {
    return useQuery(queryOptions({
        queryKey: ["postsCountByMonth"],
        queryFn: async () => {
            return fetch(import.meta.env.VITE_API_URL + "/posts/countByMonth", {
                method: "GET",
                credentials: "include"
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
// Query, get tags
// 
export function getTagsQuery(): UseQueryResult<String[]> {
    return useQuery(queryOptions({
        queryKey: ["tags"],
        queryFn: async () => {
            return fetch(import.meta.env.VITE_API_URL + "/posts/tags/", {
                method: "GET",
                credentials: "include"
            }).then(async (response) => {
                const data = await response.json()
                if (response.ok && Array.isArray(data)) {
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
        mutationFn: async ({ post, thumbnail, deleteThumbnail }:
            {
                post: IPost,
                thumbnail: File | null,
                deleteThumbnail?: boolean
            }) => {

            let API_URL = import.meta.env.VITE_API_URL + "/posts/create"
            let method = "POST"
            if (updating) {
                API_URL = import.meta.env.VITE_API_URL + "/posts/update/" + post._id
                method = "PATCH"
            }

            const formData = new FormData
            formData.append("post", JSON.stringify(post))
            if (thumbnail) {
                formData.append("thumbnail", thumbnail)
            }
            if (deleteThumbnail) {
                formData.append("deleteThumbnail", "true")
            }

            return fetch(API_URL, {
                method: method,
                body: formData,
                credentials: "include",
            }).then(async (response) => {
                const data = await response.json()
                if (response.ok && typeof data === "string") {
                    return data
                }
                throw new FetchError(response, data.error)
            })
        },
        onSuccess: (postId) => {
            queryClient.invalidateQueries({ queryKey: ["allPosts"] })
            queryClient.invalidateQueries({ queryKey: ["postsCountByMonth"] })
            queryClient.invalidateQueries({ queryKey: ["tags"] })
            queryClient.invalidateQueries({ queryKey: ["postById", postId] })
        }
    })
}

// 
// Mutation, delete post by _id
// 
export function deletePostMutation() {
    return useMutation({
        mutationFn: async (_id: string | undefined) => {
            return fetch(import.meta.env.VITE_API_URL + "/posts/delete/" + _id, {
                method: "DELETE",
                credentials: "include",
            }).then(async (response) => {
                const data = await response.json()
                if (response.ok) {
                    return data
                }
                throw new FetchError(response, data.error)
            })
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["allPosts"] })
            queryClient.invalidateQueries({ queryKey: ["postsCountByMonth"] })
            queryClient.invalidateQueries({ queryKey: ["tags"] })
        }
    })
}