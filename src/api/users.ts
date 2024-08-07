import { useMutation } from "@tanstack/react-query"
import { FetchError, fetchHeaders } from "./FetchLib"
import IUserSettings, { defaultUserSettings, isIUserSettings } from "../interfaces/userSettings"
import config from "../config/config"
import { isIUserInfo, IUserInfo } from "../interfaces/user"

// 
// Mutation, register
// 
export function registerMutation() {
    return useMutation({
        mutationFn: async ({ username, password }: { username: string, password: string }) => {
            return fetch(config.api.url + "/users/register", {
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
export function serverLoginMutation() {
    return useMutation({
        mutationFn: async ({ username, password }: { username: string, password: string }) => {
            return fetch(config.api.url + "/users/login", {
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

                if (response.ok && isIUserInfo(userInfo) && isIUserSettings(userSettings)) {
                    return ({ userInfo, userSettings })
                }
                throw new FetchError(response, data.error)
            })
        }
    })
}

// 
// Mutation, logout
// 
export function serverLogoutMutation() {
    return useMutation({
        mutationFn: async () => {
            return fetch(config.api.url + "/users/logout", {
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
export function serverChangeSettingsMutation() {
    return useMutation({
        mutationFn: async ({ userSettings }: { userSettings: IUserSettings }) => {
            return fetch(config.api.url + "/users/settings", {
                method: "POST",
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
        }
    })
}