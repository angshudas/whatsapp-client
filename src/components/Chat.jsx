import React,{useRef,useState,useEffect} from 'react';
import { aeroplane } from '../images/index';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
import { socket,appendMessage } from '../features/roomSlice';
import { v4 as uuid } from 'uuid';
import { format } from 'date-fns';

function Chat() {


  // const [text,setText] = useState();
  const textRef = useRef();
  const [scroll, setScroll] = useState(true);
  const user = useSelector(store=>store.user);
  const room = useSelector(store=>store.room);
  const messRef = useRef();
  const dispatch = useDispatch();
  const [buffer,setBuffer] = useState([]);
  // console.log(room.roomId,room.fetching,'orignal');

  useEffect(()=>{
    if( scroll && room.roomId!=='' && !room.fetching )
      scrollDown();
  },[room.messages.length]);

  useEffect(()=>{
    socket.off('receiveMessage').on('receiveMessage',receiveMessage);
    // console.log(socket);

    return ()=>{
      socket.offAny('receiveMessage');
    }
  },[room.roomId]);

  const scrollDown = ()=>{
    let messId = room.messages[room.messages.length-1]._id;
    document.getElementById(messId).scrollIntoView(true);
    setScroll(false);
  }

  const receiveMessage = (text)=>{
    // console.log(text,room);
    if( room.roomId==='' && room.fetching ){
      let buff = JSON.parse(JSON.stringify(buffer));
      buff.push({ message : text,time : Date.now() });
      setBuffer(buff);
      console.log(text,room.roomId,room.fetching);
      return;
    }
    console.log(text,'outside');

    const newMessage = {
      message: text,
      sender: room.name,
      time: Date.now(),
      _id : uuid(),
    };
    dispatch(appendMessage(newMessage));
    setScroll(true);

  }

  const handleSubmit = ()=>{
    socket.emit('sendMessage',textRef.current.value);
    const newMessage = {
      message: textRef.current.value,
      sender: user.username,
      time:  Date.now(),
      _id : uuid(),
    };
    dispatch(appendMessage(newMessage));
    // setText('');
    textRef.current.value = '';
    
    setScroll(true);
  }

  
  if( room.roomId==='' && room.fetching ) {
    return <div>Loading</div>
  }
  else if( room.roomId==='' && !room.fetching )
  return <Navigate to="/" />
  else {
    buffer.forEach(buff=>{
      let newMessage = {
        message: buff.text,
        sender: user.username===room.members[0].username?room.members[1].username:room.members[0].username,
        time: buff.time,
        _id : uuid(),
      }
      dispatch(appendMessage(newMessage));
    });
  }


  // console.log(otherUser);

  return (
    <div className='w-2/3  flex flex-col gap-2 overflow-hidden'>
      <div className='flex gap-3 items-center bg-second p-2 border-b-2 border-slate-500 w-full relative'>
        <img src={room.roomimg} alt="img" className='rounded-full aspect-square w-12 object-cover object-center border-2 border-slate-500' />
        <p className='text-xl  grow'>{room.name}</p>
      </div>

      <div ref={messRef} className='flex-grow flex flex-col px-5 gap-3 overflow-y-scroll py-6 text-lg'>
        {room.messages===[]?<div>no messages yet</div>: room.messages.map(message=>{
          let text1,text2;
          if( user.username===message.sender ){
            text1 = 'bg-emerald-500 self-end ';
            text2 = 'text-black';
          }
          else{
            text1 = 'bg-second';
            text2 = 'text-emerald-500';
          }
          return <div id={message._id} key={message._id} 
          className={`w-7/12 ${text1} px-3 py-2 rounded-md flex flex-col gap-2`}>
            <p className='flex w-full justify-between'>
              <span className={`capitalize text-xl font-bold ${text2}`}>{message.sender}</span>
              <span className='text-sm text-slate-300'>{format(new Date(message.time),'LLLL dd - hh:mm')}</span>
            </p>
            <p className='pr-6'>{message.message}</p>
          </div>
        })}
      </div>

      <div className='w-full bg-second flex justify-center py-2 gap-2 items-center'>
        <textarea ref={textRef} placeholder='Enter Text Here' cols="100" rows="2" 
        // value={text} onChange={(e)=>setText(e.target.value)}
        className='bg-slate-600 rounded-2xl px-3 placeholder:text-white py-1'></textarea>

        <div onClick={handleSubmit}
        className='flex justify-center items-center w-12 aspect-square rounded-full bg-emerald-500'>{aeroplane}</div>
      </div>
      
    </div>
  )
}

export default Chat;