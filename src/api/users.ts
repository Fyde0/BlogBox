import FetchError from "./FetchError"
import fetchHeaders from "./fetchHeaders"
import IUser, { isIUserInfo } from "../interfaces/user"
import config from "../config/config"
import { useMutation } from "@tanstack/react-query"

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