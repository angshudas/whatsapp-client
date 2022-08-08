import React,{ useState } from 'react';
import axios from 'axios';
import { Navigate } from 'react-router-dom';

function Register() {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [registered, setRegistered] = useState(false);

  const submitForm = async(e)=>{
    e.preventDefault();
    // dispathch(fetchUser({email,password,setLoggedIn}));
    let res = await axios.post('http://127.0.0.1:3500/user/register',{email,username,password});
    // console.log(res);
    if( res.status===201 ){
      setRegistered(true);
    }
  }
  const clearForm = (e)=>{
    e.preventDefault();
    setEmail('angshudas012@gmail.com');
    setUsername('angshu');
    setPassword('12345');
  }

  if( registered ){
    return <Navigate to={'/auth/login'} state={{ from : 'register',email }} />
  }

  return (
    <form className='text-white bg-second p-3 pt-10 flex flex-col gap-3 items-center'>
      <input type="text" placeholder='*Email' value={email} 
      onChange={(e)=>setEmail(e.target.value)}
      className='placeholder:text-white bg-slate-500 w-2/3 rounded-md py-1.5 px-3' /> 
      <input type="text" placeholder='Username' value={username} 
      onChange={(e)=>setUsername(e.target.value)}
      className='placeholder:text-white bg-slate-500 w-2/3 rounded-md py-1.5 px-3' /> 
      <input type="password" placeholder='*Password ' value={password} 
      onChange={(e)=>setPassword(e.target.value)}
      className='placeholder:text-white bg-slate-500 w-2/3 rounded-md py-1.5 px-3' /> 
      <div className='flex justify-center gap-4 py-5 w-2/3'>
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