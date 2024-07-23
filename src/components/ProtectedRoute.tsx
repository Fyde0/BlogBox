import { Navigate } from "react-router-dom"
import useUserStore from "../stores/user"

function ProtectedRoute() {
    const { loggedIn } = useUserStore()

    if (!loggedIn) {
        return (
            <Navigate to="/login" replace={true} />
        )
    }
}

export default ProtectedRoute