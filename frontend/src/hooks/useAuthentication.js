
import {useSelector} from "react-redux"

function useAuthentication () {

    const loggedInUser = useSelector(state => state.authStore.authUser);
    
    return {loggedInUser}
};

export {useAuthentication};
