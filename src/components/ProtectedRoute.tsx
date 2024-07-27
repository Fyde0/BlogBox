import { Navigate, Outlet } from "react-router-dom"
import useUserStore from "../stores/user"

function ProtectedRoute() {
    const { loggedIn } = useUserStore()

    if (loggedIn) {
        return <Outlet />
    }

    return (
        <Navigate to="/login" replace={true} />
    )
}

export default ProtectedRoute