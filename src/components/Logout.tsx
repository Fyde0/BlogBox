import { useMutation } from "@tanstack/react-query"
import axios from "axios"
import { Nav } from "react-bootstrap"
// 
import useUserStore from "../stores/user"
import config from "../config/config"

function Logout() {
    const { clientLogout } = useUserStore()

    const serverLogout = useMutation({
        mutationFn: async () => {
            return axios.get(
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

    if (serverLogout.isPending) {
        return (
            <div className="spinner-border spinner-border-sm" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        )
    }

    return (
        <Nav.Link onClick={() => serverLogout.mutate()} active={false}>Logout</Nav.Link>
    )
}

export default Logout