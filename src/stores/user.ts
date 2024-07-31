import { create } from 'zustand'
import { persist } from 'zustand/middleware'
// 
import { emptyUserInfo, IUserInfo } from '../interfaces/user'
import config from "../config/config"

interface IUserState {
    hydrating: boolean
    loggedIn: boolean
    userInfo: IUserInfo
    clientLogin: (info: IUserInfo) => void
    clientLogout: () => void,
    setHydrating: (hydrating: boolean) => void
}

const useUserStore = create(
    persist<IUserState>(
        (set) => ({
            hydrating: false,
            loggedIn: false,
            userInfo: emptyUserInfo,
            clientLogin: (info: IUserInfo) => set({ loggedIn: true, userInfo: info }),
            clientLogout: () => set({ loggedIn: false, userInfo: emptyUserInfo }),
            setHydrating: (hydrating: boolean) => set({ hydrating })
        }),
        // Persist in local storage
        // When reloading check with server if still logged in
        {
            name: "userInfo",
            onRehydrateStorage: () => {
                // getting from local storage here, then check with server
                return async (state) => {
                    if (!state) { return } // for TS
                    // If not logged in already, don't check
                    if (!state.loggedIn) { return }
                    state.setHydrating(true)
                    return fetch(config.api.url + "/users/ping", {
                        method: "GET",
                        credentials: 'include',
                    }).then(async (response) => {
                        if (response.ok) {
                            state.clientLogin(state.userInfo)
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