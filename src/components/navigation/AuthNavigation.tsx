import { Nav } from "react-bootstrap"
// 
import RouterLink from "./RouterLink"
import { serverLogoutMutation } from "../../api/users"
import useUserStore from "../../stores/user"

function AuthNavigation() {
    const { hydrating, loggedIn, clientLogout } = useUserStore()

    const serverLogout = serverLogoutMutation()

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
                    <>
                        <RouterLink to="/register" className="nav-link">Register</RouterLink>
                        <RouterLink to="/login" className="nav-link">Login</RouterLink>
                    </>
                    :
                    <Nav.Link
                        onClick={
                            () => serverLogout.mutate(undefined, {
                                onSuccess: () => clientLogout()
                            })
                        }
                        active={false} // keep this, see ./RouterLink
                    >
                        Logout
                    </Nav.Link>
            }
        </Nav >
    )
}

export default AuthNavigation