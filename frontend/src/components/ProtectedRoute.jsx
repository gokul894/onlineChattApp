
import { useAuthentication } from "../hooks/useAuthentication"
import {Navigate} from "react-router-dom";

function ProtectedRoute({children}) {
    const {isLogIn, _} = useAuthentication();

    return isLogIn ? children : <Navigate to="/login" replace />
}

export default ProtectedRoute;