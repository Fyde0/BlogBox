import { FetchError, fetchHeaders } from "./FetchLib"
import IUser, { isIUserInfo } from "../interfaces/user"
import config from "../config/config"
import { useMutation } from "@tanstack/react-query"

// 
// Mutation, register
// 
export function registerMutation() {
    return useMutation({
        mutationFn: async ({ user }: { user: IUser }) => {
            return fetch(config.api.url + "/users/register", {
                method: "POST",
                headers: fetchHeaders,
                body: JSON.stringify(user),
                credentials: 'include',
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
        mutationFn: async ({ user }: { user: IUser }) => {
            return fetch(config.api.url + "/users/login", {
                method: "POST",
                headers: fetchHeaders,
                body: JSON.stringify(user),
                credentials: 'include',
            }).then(async (response) => {
                const data = await response.json()
                if (response.ok && isIUserInfo(data)) {
                    return data
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
                credentials: 'include',
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