import { queryOptions, useMutation, useQuery } from "@tanstack/react-query"
// 
import { FetchError, fetchHeaders } from "./FetchLib"
import IBlogSettings, { defaultBlogSettings, isIBlogSettings } from "../interfaces/blogSettings"
import { deepMerge } from "../helpers/deepMerge"

// 
// Hook (query) get blog settings
// Using react query as a state manager
// to avoid state syncing
//
export function useBlogSettings() {
    return useQuery(queryOptions({
        queryKey: ["blogSettings"],
        queryFn: async (): Promise<IBlogSettings> => {
            return fetch(import.meta.env.VITE_API_URL + "/blog/settings")
                .then(async (response) => {
                    const data = await response.json()

                    // merge with default settings in case there are new ones
                    const blogSettings: IBlogSettings =
                        deepMerge(defaultBlogSettings, data)

                    if (response.ok && isIBlogSettings(blogSettings)) {
                        return blogSettings
                    }
                    throw new Error
                })
        },
        staleTime: Infinity, // reload only on refresh
        placeholderData: defaultBlogSettings
    }))
}


// 
// Mutation, change settings
// 
export function changeBlogSettingsMutation(previousTheme?: IBlogSettings["theme"]) {
    return useMutation({
        mutationFn: async ({ blogSettings }: { blogSettings: IBlogSettings }) => {
            return fetch(import.meta.env.VITE_API_URL + "/blog/settings", {
                method: "PATCH",
                headers: fetchHeaders,
                body: JSON.stringify(blogSettings),
                credentials: "include",
            }).then(async (response) => {
                const data = await response.json()
                if (response.ok && isIBlogSettings(data)) {
                    return data
                }
                throw new FetchError(response, data.error)
            })
        },
        onSuccess: (data: IBlogSettings) => {
            // if the theme changed
            // need to reload from home to avoid problems with loading new css
            if (previousTheme && previousTheme !== data.theme) {
                window.location.href = window.location.origin + import.meta.env.BASE_URL
            }
        }
    })
}