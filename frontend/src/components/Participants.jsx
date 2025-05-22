import React, { useRef, useState } from 'react';
import {FiEdit} from "react-icons/fi";
import {RxCross2} from "react-icons/rx"
import { useDispatch } from 'react-redux';
import { removeFriend } from '../context/baatchit.storage';

function Participants({data}) {
    const {userId, fullname } = data;
    const [fullName, setFullName] = useState(fullname);
    const friendId = useRef(userId);
    const [toggle, setToggle] = useState(false);
    const dispatch = useDispatch();

    const handleToggle = (e) => {
      e.preventDefault();
      setToggle(!toggle);
    }

    const handleDelete = (e) => {
      e.preventDefault();

      dispatch(removeFriend({friendUserId:friendId}));

    };

    const handleRename = () => {

    }


  return (
    <div>
        <div id={friendId.current} className=''>
            <h1>{fullName}</h1>
            <div className='relative' onClick={handleToggle}>
              <div>
                {fullName}
              </div>
              {toggle ? <>
                <div className='absolute h-[200px] w-[200px] bg-emerald-700 border-2 text-white'>
                  <div onClick={handleToggle}>
                    < RxCross2 />
                  </div>
                  <h1 onClick={handleDelete} className=''>delete</h1>
                  <h1 onClick={handleRename} className='' >rename</h1>
                </div>
              </> :<>

              <FiEdit />
              </>}

            </div>
        </div>
    </div>
  )
}

export default Participants