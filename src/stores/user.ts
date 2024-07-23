import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { IUserInfo } from '../interfaces/user'

interface IUserState {
    loggedIn: boolean
    userInfo: IUserInfo
    clientLogin: (info: IUserInfo) => void
    clientLogout: () => void
}

const useUserStore = create(
    persist<IUserState>(
        (set) => ({
            loggedIn: false,
            userInfo: { username: "", admin: false },
            clientLogin: (info: IUserInfo) => set({ loggedIn: true, userInfo: info }),
            clientLogout: () => set({ loggedIn: false, userInfo: { username: "", admin: false } })
        }),
        // Persist in local storage
        { name: "userInfo" }
        // TODO Add onRehydrateStorage and check if session expired with ping
    )
)

export default useUserStore