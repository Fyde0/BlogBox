import { Nav } from "react-bootstrap"
import { useMutation } from "@tanstack/react-query"
import axios from "axios"
// 
import RouterLink from "./RouterLink"
import useUserStore from "../../stores/user"
import config from "../../config/config"

function AuthNavigation() {
    const { hydrating, loggedIn, clientLogout } = useUserStore()

    // TODO Timeout, retries?
    const serverLogout = useMutation({
        mutationFn: async () => {
            return await axios.get(
                config.api.url + "/users/logout",
                { withCredentials: true }
            )
        },
        onSuccess: () => clientLogout(),
        onError: (error) => {
            // TODO handle?
            console.log(error)
        }
    })

    if (serverLogout.isPending || hydrating) {
        return (
            <div className="spinner-border spinner-border-sm" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        )
    }

    return (
        <Nav>
            {
                !loggedIn ?
                    <RouterLink to="login" className="nav-link">Login</RouterLink>
                    :
                    <Nav.Link onClick={() => serverLogout.mutate()} active={false}>Logout</Nav.Link>
            }
        </Nav>
    )
}

export default AuthNavigation