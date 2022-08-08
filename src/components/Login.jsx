import {React,useState,useEffect} from 'react';
import { useDispatch,useSelector } from 'react-redux';
import { fetchUser } from '../features/userSlice';
import { Navigate,useLocation } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);
  const dispathch = useDispatch();
  const location = useLocation();
  const [toLink, setToLink] = useState('/');

  useEffect(()=>{
    if( location?.state?.from ==='register' ){
      setToLink('/');
      setEmail(location?.state?.email || '');
    }

  },[])

  // console.log(email,toLink);


  const submitForm = (e)=>{
    e.preventDefault();
    dispathch(fetchUser({email,password,setLoggedIn}));
  }
  const clearForm = (e)=>{
    e.preventDefault();
    setEmail('angshudas012@gmail.com');
    setPassword('12345');
  }
  if( loggedIn ) return <Navigate to={toLink} />
  else return (
    <form className='text-white p-3 pt-10 bg-second flex flex-col items-center gap-2'>
      <input type="text" placeholder='Email' value={email} 
      onChange={(e)=>setEmail(e.target.value)}
      className='placeholder:text-white bg-slate-500 w-2/3 rounded-md py-1.5 px-3' />
      <input type="password" placeholder='Password' value={password} 
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
      {/* <button onClick={handleRefresh}>Refresh</button> */}
    </form>
  )
}

export default Login