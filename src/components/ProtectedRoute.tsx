import { Navigate, Outlet } from "react-router-dom"
// 
import ErrorPage from "./errors/ErrorPage"
import useUserStore from "../stores/user"

function ProtectedRoute({ admin }: { admin?: boolean }) {
    const { loggedIn, isAdmin } = useUserStore()

    if (admin === true) {
        if (isAdmin === true) {
            return <Outlet />
        } else {
            return <ErrorPage code={404} />
        }
    }

    if (loggedIn) {
        return <Outlet />
    }

    return (
        <Navigate to="/login" replace={true} />
    )
}

export default ProtectedRoute