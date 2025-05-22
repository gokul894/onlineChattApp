
import {useDispatch, useSelector} from "react-redux";
import {FaBars} from "react-icons/fa"
import { RxCross2 } from "react-icons/rx";
import { useEffect, useState } from "react";
import { API } from "../utils/Axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { eraseUser } from "../context/auth.storage";
import { addFriend } from "../context/baatchit.storage";
import Participants from "./Participants";
import ViewCompo from "./ViewCompo";


function Dashboard() {

  const navigator = useNavigate();
  const [setting, setSetting] = useState(false);
  const dispatch = useDispatch();

  const user = useSelector(state => state.auth.authUser);
  const friends = useSelector(state => state.chat.friends);

  const [friendList, setFriendList] = useState(friends);
  const [section2, setSection2] = useState({action:'default', userId:null});

  useEffect(() => {
    const authenticateUser = async () => {
      try {
        const resp = await API.get('/auth/authenticate');
      
        if(!resp?.data || resp.status !== 200){
          dispatch(eraseUser());
          navigator('/login')
        }

      } catch (error) {
        dispatch(eraseUser());
        toast.error('server error');
        navigator('/login')
      }
    }
    authenticateUser();
  },[]);

  useEffect(() => {
    setFriendList(friends);
  }, [friends]);


  const humburgerHandler = (e) => {
    e.preventDefault();

    setSetting(!setting);

  };

  const logoutHandler = async (e) => {
    e.preventDefault();

    try {
      const resp = await API.post('/auth/logout');
      dispatch(eraseUser());
      navigator('/login')
      toast.success(resp.data.sms)
      
    } catch (error) {
      console.log('logout error', error)
    }

  };


  const handleParticipantClick = (id) => {
    setSection2({action:'chat', userId:id});
  }

  const handleSection2 = (e) => {
    setSection2({action:e.currentTarget.id, userId:null});
  };

  return (
    <div className='min-h-dvh bg-accent-light text-white flex flex-row'>
      <div className='w-[30%] border-r-2 flex flex-col'>
        <div className='border-b-2 p-5 text-2xl flex flex-row gap-3 justify-center items-center'>

          {/* loggedIn user over view section */}

          <div><img src="/ledigaga.jpg" alt="logo" className='h-[50px] w-[50px] object-cover rounded-4xl ' /></div>
          <div className='flex justify-center items-center text-2xl font-semibold'>{user.fullname }</div>

          <div className="hover:cursor-pointer" onClick={humburgerHandler}>
            {setting ? <>
            
              <div className="absolute top-0 left-0 gap-2 border-2 bg-blue-600">
                <div onClick={humburgerHandler}>
                  <RxCross2/>
                </div>
              
                <h1 className="text-red-400 hover:text-red-600" onClick={logoutHandler}>LogOut</h1>
              </div>

            </> : <FaBars/>}

          </div>

          </div>
              {/** friend list section */}

        <section>
              <div className='flex flex-col items-center text-black font-semibold'>
                {
                  (() => {
                    let element = [];

                    for(const key in friendList){
                      const friend = friendList[key];
                      element.push(
                        < Participants
                        key={friend.friendUserId}
                        data={{userId:friend.friendUserId, fullname:friend.fullname }}
                        onClick={() => handleParticipantClick(friend.friendUserId)}
                        />
                      )
                    }

                    return element;

                  })()
                }

                <div className="bg-cyan-300 w-[80%] text-center hover:cursor-pointer p-2 my-2 border-2 hover:bg-cyan-500 rounded-3xl"  id="adduser" onClick={handleSection2} >
                  <h1>Add User</h1>
                </div>

              </div>
        </section>
        
      </div>
      <div className='w-[70%] bg-emerald-400'>
        <ViewCompo compoName={section2.action} userId={section2.userId } />  {/* section2 */}
      </div>
    </div>
  )
}

export default Dashboard;

