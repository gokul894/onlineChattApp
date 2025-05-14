
import {useSelector} from "react-redux"

function useAuthentication () {
    const authUser = useSelector(state => state.authStore.authUser);
    
    return {authUser}
};

export {useAuthentication};