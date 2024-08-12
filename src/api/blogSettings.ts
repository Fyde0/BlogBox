import { useMutation } from "@tanstack/react-query"
// 
import config from "../config/config"
import IBlogSettings, { isIBlogSettings } from "../interfaces/blogSettings"
import { FetchError, fetchHeaders } from "./FetchLib"

// 
// Query, get settings
//
// This is handled by zustand in stores/blogSettings
// since that's the only place where the settings go
// and state syncing is bad

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
        }
    })
}