import React,{ useState,useEffect } from 'react';
import lake from '../images/lake.jpg';
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
  const dispatch = useDispatch();
  useEffect(()=>{
    dispatch(getAllChats({accessToken:user.accessToken}));
    socket.once('connect',()=>{
      console.log('connected to socket io');
    });

  },[]);

  useEffect(()=>{
    socket.emit('setEmail',user.email);
  },[socket.id]);


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
    </div>
  )
}

export default Sidebar;