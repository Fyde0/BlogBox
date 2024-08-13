import { queryOptions, useMutation, useQuery } from "@tanstack/react-query"
// 
import { FetchError, fetchHeaders } from "./FetchLib"
import IBlogSettings, { defaultBlogSettings, isIBlogSettings } from "../interfaces/blogSettings"
import config from "../config/config"

// 
// Hook (query) get blog settings
// Using react query as a state manager
// to avoid state syncing
//
export function useBlogSettings() {
    return useQuery(queryOptions({
        queryKey: ["blogSettings"],
        queryFn: async (): Promise<IBlogSettings> => {
            return fetch(config.api.url + "/blog/settings")
                .then(async (response) => {
                    const data = await response.json()
                    if (response.ok && isIBlogSettings(data)) {
                        return data
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
export function changeBlogSettingsMutation() {
    return useMutation({
        mutationFn: async ({ blogSettings }: { blogSettings: IBlogSettings }) => {
            return fetch(config.api.url + "/blog/settings", {
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
        onSuccess: () => {
            // need to reload from home to avoid problems with loading new css
            // in case the theme changed
            window.location.href = "/" + config.basename;
        }
    })
}