import { Nav, NavDropdown } from "react-bootstrap"
// 
import RouterLink from "../RouterLink"
import { logoutMutation } from "../../api/users"
import useUserStore from "../../stores/user"

function Auth() {
    const { hydrating, loggedIn, clientLogout } = useUserStore()

    const serverLogout = logoutMutation()

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
                    <NavDropdown
                        title="User"
                        align="end"
                    >
                        <RouterLink type="dropdown" to="/account/profile">Account</RouterLink>
                        <NavDropdown.Divider />
                        <NavDropdown.Item
                            className="logout-dropdown-item"
                            onClick={
                                () => serverLogout.mutate(undefined, {
                                    onSettled: () => clientLogout()
                                })
                            }
                        >
                            Logout
                        </NavDropdown.Item>
                    </NavDropdown>
            }
        </Nav >
    )
}

export default Auth