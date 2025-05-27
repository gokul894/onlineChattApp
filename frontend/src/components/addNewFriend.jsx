import { useState } from "react";
import { addFriend } from "../context/baatchit.storage";
import { toast } from "react-toastify";
import { API } from "../utils/Axios.jsx";
import { useDispatch } from "react-redux";

function AddNewFriend() {

    const [friendname, setFriendname] = useState('');
    const [friendemail, setFriendemail] = useState(''); 
    const [isFriend, setIsFriend] = useState(true);

    const dispatch = useDispatch();

    const insertFriend = async (e) => {
      e.preventDefault(); 

    try {
      const respo = await API.post('/isfriend', {"email":friendemail});
      // console.log('fetching data',respo.data?.friend);
      // console.log(respo.data);
      if(respo.status === 200 && respo.statusText === "OK"){
        const friend = {...respo.data?.friend};
        // console.log('here have id',friend?._id)

        if(friend?._id){

          if(friendname !== ''){
            dispatch(addFriend({friendUserId:friend._id, fullname:friendname, email:friend.email}))
          }else{
            dispatch(addFriend({friendUserId:friend._id, fullname:friend.fullname, email:friend.email}));
            toast.success('you friend added');
          }

        }else{
          setIsFriend(false);
        }
      }
    } catch (error) {
      console.log('fatching friend info error', error);
    }
    };


  return (
    <>
    {isFriend ? <>
    <div className="h-[100%] w-[100%] flex flex-col justify-center items-center gap-7 text-black">
      <h3 className="text-4xl font-bold">Add new Friend</h3>
      <input className=" border-2 shadow-2xl p-2 text-center rounded-3xl" type="text" placeholder="Friend Name" onChange={(e) => setFriendname(e.target.value)} />
      <input className=" border-2 shadow-2xl p-2 text-center rounded-3xl" type="text" placeholder="Friend email" onChange={(e) => setFriendemail(e.target.value)}/>
      <button className="w-[150px] hover:cursor-pointer border-2 p-2 rounded-2xl bg-amber-400 hover:bg-amber-700 shadow-2xl font-semibold" onClick={insertFriend} >Add</button>
    </div>
     </> : <>
     <h1>Get your friends on board—refer via WhatsApp, SMS, or Facebook.</h1>
      </>}
    </>
    
  )
};

export default AddNewFriend;