import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import axios from "axios"
// 
import { IUserInfo } from '../interfaces/user'
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
            userInfo: { username: "", admin: false },
            clientLogin: (info: IUserInfo) => set({ loggedIn: true, userInfo: info }),
            clientLogout: () => set({ loggedIn: false, userInfo: { username: "", admin: false } }),
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
                    await axios.get(
                        config.api.url + "/users/ping",
                        { withCredentials: true }
                    )
                        .then((response) => {
                            response.status === 200 ? state.clientLogin(state.userInfo) : state.clientLogout()
                        })
                        .catch(() => state.clientLogout())
                        .then(() => state.setHydrating(false))
                }
            }
        }
    )
)

export default useUserStore