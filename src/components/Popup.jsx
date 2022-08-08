import React from 'react'
import { NavLink, Outlet } from 'react-router-dom';
import { close } from '../images/index'

function Popup({setPopup,popup}) {
  console.log(typeof setPopup);
  return (
    <div id='popup' className={`${popup?'flex':'hidden'} bg-black bg-opacity-70 fixed inset-0  justify-center items-center`}>
      <div className='w-fit px-10 py-5 bg-first border-2 border-green-700 rounded-lg relative'>
        <NavLink onClick={()=>setPopup(false)} to={'/'} className='w-8 aspect-square rounded-full hover:bg-red-500 duration-200 flex justify-center items-center absolute right-1 top-1 delay-75'>{close}</NavLink>
        <Outlet context={setPopup} />

      </div>
    </div>
  )
}

export default Popup;