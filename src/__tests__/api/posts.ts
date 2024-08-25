import { renderHook, waitFor } from "@testing-library/react"
import nock from "nock"
// 
import TestWrapper from "../../helpers/tests/TestWrapper"
import { getPostByPostIdQuery } from "../../api/posts"
import { placeholderPost } from "../../interfaces/post"

describe('posts', () => {
    test('should get a post by post Id', async () => {

        const postId = "id"
        nock(import.meta.env.VITE_API_URL)
            .get("/posts/byPostId/" + postId)
            .reply(200, placeholderPost)

        const { result } = renderHook(() => getPostByPostIdQuery({ postId }), { wrapper: TestWrapper })

        await waitFor(() => expect(result.current.isSuccess).toBe(true));

        expect(result.current.isSuccess).toBe(true)
        expect(result.current.data?.title).toEqual("Post title")

    })
})

