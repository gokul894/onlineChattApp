import { useState } from "react";
import { addFriend } from "../context/baatchit.storage";

function AddNewFriend() {

    const [myfriend, setMyFriend] = useState({});

    const insertFriend = async (email) => {
    try {
      const respo = await API.post('/recognize/isfriend', {email:email});
      if(respo.status === 200 && respo.statusText === "OK"){
        const {friend} = respo.data.data;

        if(friend){
          setMyFriend({
            
          })
          dispatch(addFriend({friendUserId:friend.id, fullname:friend.fullname, email:friend.email})) //{friendUserId, fullname, email}
        }else{

        }
      }
    } catch (error) {
      console.log('fatching friend info error', error);
    }
  };

  return (
    <div>
      add user
    </div>
  )
}

export default AddNewFriend