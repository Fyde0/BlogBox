import { create } from 'zustand'

interface IUserState {
    loggedIn: boolean
    username: string
    login: (username: string) => void
    logout: () => void
}

const useUserStore = create<IUserState>((set) => ({
    loggedIn: false,
    username: "",
    login: (username) => set({ loggedIn: true, username }),
    logout: () => { set({ loggedIn: false, username: "" }) }
}))

export default useUserStore