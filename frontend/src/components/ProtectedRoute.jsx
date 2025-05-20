
import { useAuthentication } from "../hooks/useAuthentication"
import {Navigate} from "react-router-dom";

function ProtectedRoute({children}) {
    const { loggedInUser } = useAuthentication();

    return loggedInUser.id ? children : <Navigate to="/login" replace />
}

export default ProtectedRoute;
