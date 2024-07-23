import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useMutation } from "@tanstack/react-query"
import axios from "axios"
// 
import { isUserInfo } from "../interfaces/user"
import useUserStore from "../stores/user"
import config from "../config/config"

function Login() {
    const [username, setUsername] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [error, setError] = useState<string>("")
    const { clientLogin } = useUserStore()
    const navigate = useNavigate()

    const serverLogin = useMutation({
        mutationFn: async () => {
            return axios.post(
                config.api.url + "/users/login",
                { username, password },
                { withCredentials: true }
            )
        },
        onSuccess: (data: any) => {
            const userInfo = data.data
            if (isUserInfo(userInfo)) {
                clientLogin(userInfo)
                navigate("/", { replace: true })
            } else {
                // If the response is not a user
                setError("Unknown server error.")
            }
        },
        onError: (error: any) => {
            error.response
                ? setError(error.response.data)
                : setError("Something went wrong.")
        },
    })

    function handleLogin(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        setError("")
        // Validate fields
        if (!username || !password) {
            setError("One or more fields are empty.")
            return false
        }
        serverLogin.mutate()
    }

    return (
        <main
            className="m-auto"
            style={{ maxWidth: "300px" }}
        >
            <form onSubmit={handleLogin}>
                <h1 className="h3 mb-4">Login</h1>
                {/* Error */}
                {error != "" &&
                    <div className="alert alert-danger">
                        {error}
                    </div>
                }
                {/* Username */}
                <div className="mb-2">
                    <label className="mb-1 w-100">
                        Username
                        <input
                            className="form-control" id="floatingInput"
                            value={username}
                            onChange={event => setUsername(event.target.value)}
                        />
                    </label>
                </div>
                {/* Password */}
                <div className="mb-4">
                    <label className="mb-1 w-100" htmlFor="floatingPassword">
                        Password
                        <input
                            type="password" className="form-control w-100" id="floatingPassword"
                            value={password}
                            onChange={event => setPassword(event.target.value)}
                        />
                    </label>
                </div>
                {/* Button */}
                <div>
                    <button className="btn btn-primary py-2 w-100">
                        {serverLogin.isPending ?
                            <>
                                <span className="spinner-border spinner-border-sm" aria-hidden="true"></span>
                                <span className="visually-hidden" role="status">Loading...</span>
                            </>
                            :
                            <span>Sign In</span>
                        }
                    </button>
                </div>
            </form>
        </main>
    )
}

export default Login