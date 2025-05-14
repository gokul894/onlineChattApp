import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { API } from "../utils/Axios";


function Profile() {

    const {_, fullname, email, username} = useSelector(state => state.authStore.authUser);

    const clickHandler = async (e) => {
        e.preventDefault();

        try {
            const resp = await API.post('/auth/logout', {});
            
        } catch (err) {
            toast.error(err.message)
            console.log('logOut error', err)
        }

    }

  return (
    <div className=" flex flex-col justify-center items-center ">

        <img src="http://lsdj.ksldfjlkjfd" alt="img" />
        
        <h1>{fullname}</h1>
        <h1>{email}</h1>
        <h1>{username}</h1>
        <h1 className="text-red-400 mt-5 hover:cursor-pointer hover:text-red-600" onClick={ clickHandler }>SignOut</h1>


    </div>
  )
}

export default Profile