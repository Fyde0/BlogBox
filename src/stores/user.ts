import { create } from 'zustand'
// 
import IUserSettings, { defaultUserSettings, isIUserSettings } from "../interfaces/userSettings"
import { emptyUserInfo, isIUserInfo, IUserInfo } from "../interfaces/user"
import { fetchHeaders } from "../api/FetchLib"

interface IUserState {
    hydrating: boolean
    loggedIn: boolean
    userInfo: IUserInfo
    userSettings: IUserSettings
    isAdmin?: boolean
    clientLogin: (info: IUserInfo, settings: IUserSettings, isAdmin: boolean) => void
    clientLogout: () => void
    changeUserInfo: (userInfo: IUserInfo) => void
    changeSettings: (settings: IUserSettings) => void
    setIsAdmin: (isAdmin: boolean) => void
    fetch: () => void
}

const useUserStore = create<IUserState>()(
    (set, get) => ({
        hydrating: false,
        loggedIn: false,
        userInfo: emptyUserInfo,
        userSettings: defaultUserSettings,
        isAdmin: false,
        clientLogin: (info, settings, isAdmin) => set({
            loggedIn: true,
            userInfo: info,
            userSettings: settings,
            isAdmin: isAdmin
        }),
        clientLogout: () => set({
            loggedIn: false,
            userInfo: emptyUserInfo,
            userSettings: defaultUserSettings,
            isAdmin: false
        }),
        changeUserInfo: (userInfo) => set({ userInfo: userInfo }),
        changeSettings: (settings) => set({ userSettings: settings }),
        setIsAdmin: (isAdmin) => set({ isAdmin }),
        fetch: async () => {
            set({ hydrating: true })
            return fetch(import.meta.env.VITE_API_URL + "/users/ping", {
                method: "GET",
                headers: fetchHeaders,
                credentials: "include",
            }).then(async (response) => {
                const data = await response.json()

                const userInfo: IUserInfo = data.userInfo
                // merge with default settings in case there are new ones
                const userSettings: IUserSettings =
                    { ...defaultUserSettings, ...data.userSettings }
                const isAdmin = data.admin

                if (
                    response.ok &&
                    isIUserInfo(userInfo) &&
                    isIUserSettings(userSettings) &&
                    typeof isAdmin === "boolean"
                ) {
                    get().clientLogin(userInfo, userSettings, isAdmin)
                }
                set({ hydrating: false })
            })
        }
    })
)

// fetch initial state from api
useUserStore.getState().fetch()

export default useUserStore