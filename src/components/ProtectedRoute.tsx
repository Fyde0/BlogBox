import { ReactNode } from "react"
import { Navigate } from "react-router-dom"
import useUserStore from "../stores/user"

function ProtectedRoute({ children }: { children: ReactNode }) {
    const { loggedIn } = useUserStore()

    if (loggedIn) {
        return children
    }

    return (
        <Navigate to="/login" replace={true} />
    )
}

export default ProtectedRoute