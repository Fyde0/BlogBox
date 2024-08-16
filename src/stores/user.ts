import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'
// 
import IUserSettings, { defaultUserSettings } from "../interfaces/userSettings"
import { emptyUserInfo, IUserInfo } from "../interfaces/user"
import config from "../config/config"

// TODO don't persist, refetch at start (don't use react query?)

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
    setHydrating: (hydrating: boolean) => void
}

const useUserStore = create<IUserState>()(
    persist(
        (set) => ({
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
            setHydrating: (hydrating) => set({ hydrating })
        }),
        // Persist in local storage
        {
            name: "userState",
            storage: createJSONStorage(() => localStorage),
            partialize: (state) => {
                // don't store admin status, instead
                // check with server when hydrating
                delete state.isAdmin
                return state
            },
            // check with server if still logged in and if admin
            // this happens when opening the page (incl. refresh)
            onRehydrateStorage: () => {
                // getting from local storage here
                // now, check with server
                return async (state) => {
                    if (!state) { return } // for TS
                    // If not logged in already, don't check
                    if (!state.loggedIn) { return }
                    state.setHydrating(true)
                    return fetch(config.api.url + "/users/ping", {
                        method: "GET",
                        credentials: 'include',
                    }).then(async (response) => {
                        const data = await response.json()
                        if (response.ok) {
                            state.clientLogin(
                                state.userInfo,
                                state.userSettings,
                                // admin status from server
                                data.isAdmin
                            )
                        } else {
                            state.clientLogout()
                        }
                    }).catch(() => state.clientLogout())
                        .finally(() => state.setHydrating(false))
                }
            }
        }
    )
)

export default useUserStore