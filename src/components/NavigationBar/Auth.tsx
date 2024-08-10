import { Dropdown, Nav, NavLink } from "react-bootstrap"
// 
import RouterLink from "../RouterLink"
import { logoutMutation } from "../../api/users"
import useUserStore from "../../stores/user"
import Avatar from "../Avatar"

function Auth() {
    const { userInfo, hydrating, loggedIn, clientLogout } = useUserStore()

    const serverLogout = logoutMutation()

    if (serverLogout.isPending || hydrating) {
        return (
            <div className="spinner-border spinner-border-sm" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        )
    }

    function handleLogout() {
        serverLogout.mutate(undefined, {
            onSettled: () => clientLogout()
        })
    }

    return (
        <>
            {
                !loggedIn ?
                    <>
                        <RouterLink to="/register" className="nav-link">Register</RouterLink>
                        <RouterLink to="/login" className="nav-link">Login</RouterLink>
                    </>
                    :
                    <>
                        {/* 
                        On larger screens the links are in a dropdown
                        On smaller screens they are normal links in the offcanvas
                        Ugly code, but the UI looks very nice
                        */}

                        {/* Only on >= 768px */}
                        <Dropdown align="end" className="d-none d-lg-block">
                            <Dropdown.Toggle as={NavLink} className="p-0">
                                <Avatar avatar={userInfo.avatar} size={32} />
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                <RouterLink type="dropdown" to="/account/profile">Account</RouterLink>
                                <Dropdown.Divider />
                                <Dropdown.Item
                                    className="logout-dropdown-item"
                                    onClick={handleLogout}
                                >
                                    Logout
                                </Dropdown.Item>
                            </Dropdown.Menu>

                        </Dropdown>

                        {/* Only on < 768px */}
                        <div className="d-block d-lg-none">
                            <hr className="my-2" />
                            <RouterLink to="/account/profile" className="nav-link">Account</RouterLink>
                            <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
                        </div>
                    </>
            }
        </>
    )
}

export default Auth