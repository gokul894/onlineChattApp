
import { useAuthentication } from "../hooks/useAuthentication"
import {Navigate} from "react-router-dom";

function ProtectedRoute({children}) {
    const { authUser } = useAuthentication();

    return authUser.id ? children : <Navigate to="/login" replace />
}

export default ProtectedRoute;