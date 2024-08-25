import { renderHook, waitFor } from "@testing-library/react"
import nock from "nock"
// 
import TestWrapper from "../../helpers/tests/TestWrapper"
import { useBlogSettings } from "../../api/blogSettings"
import { defaultBlogSettings } from "../../interfaces/blogSettings"

describe('blogSettings', () => {
    test('should get blogSettings', async () => {

        nock(import.meta.env.VITE_API_URL)
            .get("/blog/settings")
            .reply(200, defaultBlogSettings)

        const { result } = renderHook(() => useBlogSettings(), { wrapper: TestWrapper })

        await waitFor(() => expect(result.current.isSuccess).toBe(true))

        expect(result.current.isSuccess).toBe(true)
        expect(result.current.data?.theme).toEqual(defaultBlogSettings.theme)
    })
})

