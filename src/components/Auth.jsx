import React from 'react'
import { NavLink, Outlet } from 'react-router-dom'

function Auth() {

  function activeLink({isActive}){
    let text = 'w-1/2 border-emerald-500 py-1.5 font-bold uppercase';
    if( isActive )
    text += ' bg-second border-t-4  text-emerald-300 rounded-t-md';
    else 
    text+= ' rounded-b-lg border-b-4 border-second';

    return text;
    
  }

  return (
    <div className='bg-first h-screen w-screen'>
      <div className='w-1/2 border-emerald-500 border-x-4 border-b-4 rounded-md fixed left-1/4 top-1/4'>
        <div className='flex  justify-around text-xl text-white text-center bg-emerald-500'>
          <NavLink to='/auth/login' 
          className={activeLink}>
            Login
          </NavLink>
          <NavLink to='/auth/register' 
          className={activeLink}
          >Register</NavLink>
        </div >
        <Outlet />
      </div>
    </div>
  )
}

export default Auth;