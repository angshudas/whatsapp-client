import React,{useState} from 'react';
import { useDispatch,useSelector } from 'react-redux';
import { updatePassword } from '../features/userSlice';
import { useOutletContext,Navigate } from 'react-router-dom';

function UpdatePassword() {
  const [oldPass, setOldPass] = useState('');
  const [newPass, setNewPass] = useState('');
  const [updated, setUpdated] = useState(false);
  const setPopup = useOutletContext();
  const user = useSelector(store=>store.user);
  const dispatch = useDispatch();
  

  const handleUpdate = ()=>{
    if( !oldPass || !newPass ){
      console.log('old and new password required');
      return;
    }
    dispatch( updatePassword({
      data : {
        oldPassword : oldPass,
        newPassword : newPass,
      },
      accessToken : user.accessToken,
      setUpdated,
    }) )

  }

  const handleClear = ()=>{
    setNewPass('');
    setOldPass('');
  }

  if( updated ){
    setPopup(false);
    return <Navigate to={'/'} />
  }
  
  return (
    <div className='flex flex-col gap-4'>
      <h1 className='text-center text-3xl text-green-600 font-semibold my-2.5 '>Update Password</h1>
      <input type="text" placeholder='Old Password' value={oldPass} onChange={(e)=>setOldPass(e.target.value)}
      className='w-80 placeholder:text-white bg-slate-600 rounded-md px-2 py-1.5' />
      <input type="text" placeholder='New Password' value={newPass} onChange={(e)=>setNewPass(e.target.value)}
      className='w-80 placeholder:text-white bg-slate-600 rounded-md px-2 py-1.5' />
      <div className='w-full flex justify-center gap-2 text-xl'>
        <button onClick={handleUpdate}
        className='grow py-1 bg-green-500 rounded-md border-4 border-green-500 hover:border-green-700 duration-200'>Update</button>
        <button onClick={handleClear}
        className='grow py-1 bg-red-500 rounded-md border-4 border-red-500 hover:border-red-700 duration-200'>Clear</button>
      </div>
    </div>
  )
}

export default UpdatePassword