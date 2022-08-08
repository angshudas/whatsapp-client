import React,{ useEffect,useState } from 'react';
import { useDispatch,useSelector } from 'react-redux';
import { Navigate,Outlet,useLocation } from 'react-router-dom';
import { refresh } from '../features/userSlice';
import Loading from './Loading';

function PersistentUser() {
  const { isLoading,accessToken } = useSelector(store=>store.user);
  const location = useLocation();
  const dispatch = useDispatch();
  const [tried, setTried] = useState(false);

  useEffect(()=>{
    dispatch(refresh(setTried));
  },[]);
  // console.log( tried );

  if( isLoading || !tried )  
    return <Loading />
  else if ( tried && !accessToken )
    return <Navigate to={'/auth/login'} state={{from : location.pathname}} />
  else 
    return <Outlet/>
    

}

export default PersistentUser;