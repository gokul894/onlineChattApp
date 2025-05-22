import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';

function chatView({userId}) {

  useEffect(() => {
    const chats = useSelector(state => state.chat.chats[userId]);
  }, []);

  return (
    <div>chatView</div>
  )
}

export default chatView