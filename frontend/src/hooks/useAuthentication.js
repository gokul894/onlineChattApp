
import {useSelector} from "react-redux"

function useAuthentication () {
    const authUser = useSelector(state => state.authStore.authUser);
    const isLogIn = useSelector(state => state.authStore.isLogedIn);

    return {isLogIn, authUser}
};

export {useAuthentication};