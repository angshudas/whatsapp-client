import React,{ useState,useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { edit,close } from '../images/index';
import { updateUser } from '../features/userSlice';
import { Navigate,useOutletContext } from 'react-router-dom';

function UpdateDetails() {
  const setPopup = useOutletContext();
  const [email, setEmail] = useState(false);
  const [username, setUsername] = useState(false);
  const [userimg, setUserimg] = useState('');
  const [updated, setUpdated] = useState(false);
  const user = useSelector(store=>store.user);
  const dispatch = useDispatch();
  

  const clearInput = (e)=>{
    setEmail(false);
    setUsername(false);
  }

  const toggleUsername = ()=>{
    if( username===false ){
      setUsername('');
      // usernameRef.current.focus();
    }
    else 
      setUsername(false);
  }
  const toggleEmail = ()=>{
    if( email===false ){
      setEmail('');
      // emailRef.current.focus();
    } 
    else 
      setEmail(false);
  }
  const handleUpdate = ()=>{
    let myuser = {
      _email : '',
      _userimg : '',
      _username : '',
    };
    
    if( !email && !userimg && !username ){
      console.log('atleast update one field');
      return;
    }

    if( email ) 
      myuser = {...myuser,_email:email};
    if( userimg )
      myuser = {...myuser,_userimg:userimg};
    if( username )
      myuser = {...myuser,_username:username};

    console.log(myuser);

    dispatch(updateUser({myuser,accessToken:user.accessToken,setUpdated}));
      
  }


  if( updated ){
    // console.log(typeof setPopup);
    setPopup(false);
    
    return <Navigate to="/" />
  }
  

  return (
    <div className='flex flex-col gap-4'>
      <h1 className='text-center text-3xl text-green-600 font-semibold my-2.5 '>Update Details</h1>     
   
    <label htmlFor="userimg">
      <div className='w-24 aspect-square rounded-full bg-green-500 absolute top-1/2 right-full -translate-y-1/2 translate-x-8'>

      </div>
      <input type="file" className='hidden' id='userimg' />
    </label> 
      <div>
        <div className='flex gap-2 items-center'>
          <span onClick={toggleEmail} className={`w-8 flex items-center justify-center ${email===false?'hover:bg-green-500':'hover:bg-red-500'} duration-200 aspect-square rounded-full`}>{email===false?edit:close}</span> 
          {email===false?
            <span className='text-lg'>Email : {user.email}</span>  :
            // <span>{user.email}</span> :
            <input type="text" placeholder='Email' value={email} onChange={(e)=>{setEmail(e.target.value)}}
      className='w-80 placeholder:text-white bg-slate-600 rounded-md px-2 py-1.5' />
          }
        </div>
      </div>
      <div>
        <div className='flex gap-2 items-center'>
          <span onClick={toggleUsername} className={`w-8 flex items-center justify-center ${username===false?'hover:bg-green-500':'hover:bg-red-500'} duration-200 aspect-square rounded-full`}>{username===false?edit:close}</span> 
          {username===false?
            <span className='text-lg w-80'>Username : {user.username} </span> :
            <input type="text" placeholder='Username' value={username} onChange={(e)=>{setUsername(e.target.value)}}
              className='w-80 placeholder:text-white bg-slate-600 rounded-md px-2 py-1.5' />
        }
        </div>
      </div>

      <div className='w-full flex justify-center gap-2 text-xl'>
        <button onClick={handleUpdate}
        className='grow py-1 bg-green-500 rounded-md border-4 border-green-500 hover:border-green-700 duration-200'>Update</button>
        <button onClick={clearInput}
        className='grow py-1 bg-red-500 rounded-md border-4 border-red-500 hover:border-red-700 duration-200'>Clear</button>
      </div>
    </div>
  )
}

export default UpdateDetails