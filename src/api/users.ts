import { useMutation } from "@tanstack/react-query"
import { FetchError, fetchHeaders } from "./FetchLib"
import IUserSettings, { defaultUserSettings, isIUserSettings } from "../interfaces/userSettings"
import { isIUserInfo, IUserInfo } from "../interfaces/user"
import queryClient from "./queryClient"

// 
// Mutation, register
// 
export function registerMutation() {
    return useMutation({
        mutationFn: async ({ username, password }: { username: string, password: string }) => {
            return fetch(import.meta.env.VITE_API_URL + "/users/register", {
                method: "POST",
                headers: fetchHeaders,
                body: JSON.stringify({ username, password }),
                credentials: "include",
            }).then(async (response) => {
                const data = await response.json()
                if (response.ok) {
                    return data
                }
                throw new FetchError(response, data.error)
            })
        }
    })
}

// 
// Mutation, login
// 
export function loginMutation() {
    return useMutation({
        mutationFn: async ({ username, password }: { username: string, password: string }) => {
            return fetch(import.meta.env.VITE_API_URL + "/users/login", {
                method: "POST",
                headers: fetchHeaders,
                body: JSON.stringify({ username, password }),
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
                    return ({ userInfo, userSettings, isAdmin })
                }
                throw new FetchError(response, data.error)
            })
        }
    })
}

// 
// Mutation, logout
// 
export function logoutMutation() {
    return useMutation({
        mutationFn: async () => {
            return fetch(import.meta.env.VITE_API_URL + "/users/logout", {
                method: "GET",
                headers: fetchHeaders,
                credentials: "include",
            }).then(async (response) => {
                const data = await response.json()
                if (response.ok) {
                    return data
                }
                throw new FetchError(response, data.error)
            })
        }
    })
}

// 
// Mutation, change settings
// 
export function changeSettingsMutation() {
    return useMutation({
        mutationFn: async ({ userSettings }: { userSettings: IUserSettings }) => {
            return fetch(import.meta.env.VITE_API_URL + "/users/settings", {
                method: "PATCH",
                headers: fetchHeaders,
                body: JSON.stringify(userSettings),
                credentials: "include",
            }).then(async (response) => {
                const data = await response.json()
                if (response.ok && isIUserSettings(data)) {
                    return data
                }
                throw new FetchError(response, data.error)
            })
        },
        onSuccess: () => {
            // need to run queries again in case postsPerPage changed
            queryClient.invalidateQueries({ queryKey: ["allPosts"] })
            queryClient.invalidateQueries({ queryKey: ["postsCountByMonth"] })
            queryClient.invalidateQueries({ queryKey: ["tags"] })
        }
    })
}

// 
// Mutation, update user info
// 
export function updateUserInfoMutation() {
    return useMutation({
        mutationFn: async (userInfo: FormData) => {
            // no headers because there's a file, docs say so
            return fetch(import.meta.env.VITE_API_URL + "/users/update", {
                method: "PATCH",
                body: userInfo,
                credentials: "include",
            }).then(async (response) => {
                const data = await response.json()
                if (response.ok && isIUserInfo(data)) {
                    return data
                }
                throw new FetchError(response, data.error)
            })
        },
        onSuccess: () => {
            // run single post queries again to show new user info
            queryClient.invalidateQueries({ queryKey: ["postById"] })
        }
    })
}