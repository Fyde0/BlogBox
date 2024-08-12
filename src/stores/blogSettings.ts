import { create } from 'zustand'
// 
import IBlogSettings, { defaultBlogSettings, isIBlogSettings } from "../interfaces/blogSettings"
import config from "../config/config"

interface IBlogState {
    fetching: boolean
    blogSettings: IBlogSettings,
    changeBlogSettings: (blogSettings: IBlogSettings) => void
    fetch: () => void
}

const useBlogSettingsStore = create<IBlogState>()(
    (set) => ({
        fetching: false,
        blogSettings: defaultBlogSettings,
        changeBlogSettings: (settings) => set({ blogSettings: settings }),

        fetch: async () => {
            set({ fetching: true })
            await fetch(config.api.url + "/blog/settings")
                .then(async (response) => {
                    const data = await response.json()
                    if (response.ok && isIBlogSettings(data)) {
                        set({ blogSettings: data })
                    }
                })
            set({ fetching: false })
        }

    })
)

// get initial state from server
useBlogSettingsStore.getState().fetch()

export default useBlogSettingsStore