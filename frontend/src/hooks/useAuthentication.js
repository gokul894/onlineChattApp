
import {useSelector} from "react-redux"

function useAuthentication () {

    const loggedInUser = useSelector(state => state.auth.authUser);
    
    return {loggedInUser}
};

export {useAuthentication};
