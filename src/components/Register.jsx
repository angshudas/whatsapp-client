import React,{ useState,useRef } from 'react';
import axios from 'axios';
import { Navigate } from 'react-router-dom';
import { default_userimg } from '../images/index';

function Register() {
  const emailRef = useRef('');
  const usernameRef = useRef('');
  const passwordRef = useRef('');
  const [userimg, setUserimg] = useState('');

  const [registered, setRegistered] = useState(false);

  const submitForm = async(e)=>{
    e.preventDefault();

    let res = await axios.post('http://127.0.0.1:3500/user/register',{
      email : emailRef.current.value,
      username : usernameRef.current.value,
      password : passwordRef.current.value,
      userimg,
    });
    if( res.status===201 ){
      setRegistered(true);
    }
  }
  const clearForm = (e)=>{
    e.preventDefault();
    emailRef.current.value = '';
    usernameRef.current.value = '';
    passwordRef.current.value = '';
    setUserimg('');
  }

  const convertImage = ()=>{
    let file = document.querySelector('#userimg')['files'][0];
    let reader = new FileReader();
    // let baseString;
    reader.onloadend = function () {
        setUserimg(reader.result);
        // console.log(baseString); 
    };
    reader.readAsDataURL(file);
    
  }

  if( registered ){
    return <Navigate to={'/auth/login'} state={{ from : 'register',email : emailRef.current.value }} />
  }

  return (
    <form className='text-white bg-second p-3 pt-10 flex flex-wrap gap-3 justify-center items-center relative'>

      <label htmlFor="userimg" className='w-1/6'>

        <img src={userimg===''?default_userimg:userimg} alt="" className='w-full aspect-square object-fill object-center bg-white rounded-full' />

        <input type="file" className='hidden' id='userimg' onChange={convertImage} />
      </label>

      <fieldset className='w-4/6 flex flex-col gap-2 '>
        <input ref={emailRef} type="text" placeholder='*Email' 
        className='placeholder:text-white bg-slate-500 w-full rounded-md py-1.5 px-3' /> 

        <input ref={usernameRef} type="text" placeholder='Username' 
        className='placeholder:text-white bg-slate-500 w-full rounded-md py-1.5 px-3' /> 

        <input ref={passwordRef} type="password" placeholder='*Password '
        className='placeholder:text-white bg-slate-500 w-full rounded-md py-1.5 px-3' /> 
      </fieldset>

      <div className='flex justify-center gap-4 py-5 w-full self-center '>
        <button 
          className='bg-green-600 text-white text-xl rounded-md px-2 py-1.5 w-1/3' 
          onClick={submitForm} >Submit</button>
        <button 
          className='bg-red-600 text-white text-xl rounded-md px-2 py-1.5 w-1/3'
          onClick={clearForm} >Clear</button>
      </div>
    </form>
  )
}

export default Register