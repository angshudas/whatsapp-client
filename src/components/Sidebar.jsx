import React,{ useState,useEffect } from 'react';
import { useSelector,useDispatch } from 'react-redux';
import { getAllChats } from '../features/chatSlice';
import {more} from '../images/index';
import { NavLink } from 'react-router-dom';
import { socket } from '../features/roomSlice';
import { getRoomDetails } from '../features/roomSlice';


function Sidebar() {

  const user = useSelector(store=>store.user);
  const chats = useSelector(store=>store.chat);
  const [hideMore, setHideMore] = useState(true);
  const [disconnected, setDisconnected] = useState(0);
  const MAX_RECONNECT_COUNT = 3;
  const dispatch = useDispatch();
  useEffect(()=>{
    dispatch(getAllChats({accessToken:user.accessToken}));
    // console.log('connect');
    socket.connect();
    socket.on('connect',()=>{
      console.log('connected to socket io');
      setDisconnected(false);
    });
    socket.once("connect_error", (err) => {
      console.log(`connect_error due to ${err.message}`);
      setDisconnected(disconnected+1);
      if( disconnected+1<=MAX_RECONNECT_COUNT ){
        console.log(disconnected);
        socket.connect();
      }
    });
    socket.once('disconnect',()=>{
      socket.connect()
      console.log('disconnected');
    });

    return ()=>{
      // console.log('dismounted');
      socket.removeAllListeners('connect');
      socket.removeAllListeners('reconnect_failed');
    }

  },[]);

  useEffect(()=>{
    socket.emit('setEmail',user.email);
  },[socket.id]);

  const reconnectSocket = ()=>{
    setDisconnected(0);
    socket.connect();
  }


  return (
    <div className='w-1/3 border-r-slate-500  border-r-2 flex flex-col items-center gap-6'>
      <div className='flex gap-3 items-center bg-second p-2 border-b-2 border-slate-500 w-full relative'>
        <img src={user.userimg} alt="img" className='rounded-full aspect-square w-12 object-cover object-center border-2 border-slate-500' />
        <p className='text-xl grow'>{user.username}</p>
        <div className='hover:bg-emerald-500 w-8 aspect-square rounded-full flex justify-center items-center duration-200' onClick={()=>{setHideMore(!hideMore)}}>{more}</div>
        <div onClick={()=>{setHideMore(!hideMore)}} className={`${hideMore?'hidden':'flex'} flex flex-col  absolute top-full left-full -translate-x-1/2 flex-none bg-slate-700 w-max p-2 gap-2 text-center`}>
          <NavLink  to={'/popup/newchat'} 
          className='hover:text-green-500 rounded-md w-full px-2.5 py-1.5 cursor-pointer hover:scale-105 bg-second'>New Chat</NavLink>
          <NavLink  to={'/popup/deletechat'} 
          className='hover:text-green-500 rounded-md w-full px-2.5 py-1.5 cursor-pointer hover:scale-105 bg-second'>Delete Chat</NavLink>
          <NavLink  to={'/popup/updatedetails'} 
          className='hover:text-green-500 rounded-md w-full px-2.5 py-1.5 cursor-pointer hover:scale-105 bg-second'>Update Details</NavLink>
          <NavLink  to={'/popup/updatepassword'} 
          className='hover:text-green-500 rounded-md w-full px-2.5 py-1.5 cursor-pointer hover:scale-105 bg-second'>Update Password</NavLink>
        </div>
      </div>


      <input type="text" placeholder='Search Contacts Here' 
      className='w-11/12 bg-third rounded-2xl py-1.5 px-2 placeholder:text-center placeholder:text-white placeholder:text-lg ' />

      <div className='w-full flex flex-col gap-2 py-3 flex-grow overflow-y-scroll overflow-x-hidden cursor-pointer'>
        {chats.joinedChats.map(chat=>{
          // {[newChat]}.map(chat=>{
          return <NavLink to={`chat/${chat._id}`} key={chat._id} 
          onClick={()=>dispatch(getRoomDetails({name : chat.members[0].username,roomId : chat._id,roomimg : chat.members[0].userimg,accessToken : user.accessToken}))}
          className="  flex items-center hover:scale-105 py-2 px-3.5 gap-2 border-b-2 border-slate-500 delay-100  ">
            <img src={chat.members[0].userimg} alt="img" className='rounded-full aspect-square w-12 object-cover object-center border-2 border-slate-500'/>
            <div>
            <p className='text-xl'>{chat.members[0].username}</p>
            <p className='text-xs'>Lorem ipsum dolor sit amet consectetu adipisicing </p>
            </div>
          </NavLink>
        })}
      </div>
      { disconnected>MAX_RECONNECT_COUNT && <div className='fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center'>
        <div className='w-2/3 text-emerald-200 border-2 border-emerald-500 rounded-md px-3 py-2 flex-col flex items-center gap-5'>
          <h2 className='text-2xl text-center text-green-500'>You Got Disconnected! Try To Reconnect</h2>
          <button className='bg-green-500 px-3 py-1.5 text-white uppercase rounded-md font-bold w-1/4' 
          onClick={reconnectSocket}>Reconnect</button>
        </div>
      </div> }
    </div>

  )
}

export default Sidebar;