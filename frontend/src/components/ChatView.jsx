import { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux';
import { BiCheckDouble } from "react-icons/bi";
import { MdCheck } from "react-icons/md";
import { useSendMessage } from '../hooks/useChatController';

function chatView({userId}) {
  // const chats = useSelector(state => state.chat.chats[userId]);
  console.log('chatview line 9 userId',userId);
  const idRef = useRef(userId);
  const receiver = useSelector(state => state.chat.friends[userId]);
  const chatId = receiver?.chatId; //{ friendUserId, fullname, email, chatId }
  const chats = useSelector(state => state.chat.chats[chatId]);
  // console.log(chats)
  const authUsr = useSelector(state => state.auth.authUser);
  const [allChat, setAllChat ] = useState(chats);
  const [newText, setNewText] = useState(null);
  const sendMessage = useSendMessage();
  
  useEffect(() => {
    setAllChat(chats);
  }, [chats]);


  const handleSendSms = () => {
    console.log('chatview line 26 userId sending', userId);
    sendMessage(userId, newText);
  }

  return (
    <div className='h-full flex flex-col items-center'>

      {/** receiver information */}
      <div className='h-[10%] w-full border-b-2 flex justify-center p-3'>
        <h1>{receiver.fullname}</h1>
      </div>

      {/** here showing all messages */}
      <section id='one' className='h-[90%] w-[80%] justify-center gap-2 mt-2'>
        { (() => {
          let chats = [];

          for (const key in allChat){
            const {senderId, recieverId, text, time, delevered} = allChat[key]; //{ senderId, recieverId, text, time, delevered }
            if(senderId === authUsr._id){
              chats.push( <div className='flex justify-end items-center gap-2' key={key}>
                <div>{ delevered ? <BiCheckDouble/> : <MdCheck/> }</div>
                <h1 className='text-2xl font-semibold'>{text} </h1>
              </div>  )
            }else{
              chats.push(<div className='flex justify-start items-center gap-2' key={key}>
                <div>{ delevered ? <BiCheckDouble/> : <MdCheck/> }</div>
                <h1 className='text-2xl font-semibold' >{ text }</h1>
              </div>)
            }
          }

          return chats;

        })() }
      </section>

      {/** here sending chat method */}
      <section id='two' className='w-full h-[10%] flex flex-row items-center justify-center gap-6 border-t-2 py-2'>
        <input type="text" placeholder='text..'  className='bg-accent-light p-2 text-center border-2 border-amber-50 rounded-3xl' onChange={(e) => setNewText(e.target.value)} />
        <button className='text-2xl font-semibold bg-accent-light border-2 py-2  px-5 hover:cursor-pointer hover:bg-accent  rounded-3xl' onClick={() => handleSendSms()} >send</button>
      </section>
    </div>
  )
}

export default chatView;