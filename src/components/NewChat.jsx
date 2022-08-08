import React,{ useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addNewChat } from '../features/chatSlice';

function NewChat() {
  const [email, setEmail] = useState('');
  const {accessToken} = useSelector(store=>store.user);
  const dispatch = useDispatch();
  return (
    <div className='flex flex-col gap-4'>
      <h1 className='text-center text-3xl text-green-600 font-semibold my-2.5 '>Add Chat</h1>
      <input type="text" placeholder='New Chat' value={email} onChange={(e)=>setEmail(e.target.value)}
      className='w-80 placeholder:text-white bg-slate-600 rounded-md px-2 py-1.5' />
      <div className='w-full flex justify-center gap-2 text-xl'>
        <button onClick={()=>{ dispatch(addNewChat({accessToken,friend:email})) }}
        className='grow py-1 bg-green-500 rounded-md border-4 border-green-500 hover:border-green-700 duration-200'>Add</button>
        <button onClick={()=>{ setEmail('') }}
        className='grow py-1 bg-red-500 rounded-md border-4 border-red-500 hover:border-red-700 duration-200'>Clear</button>
      </div>
    </div>
  )
}

export default NewChat;