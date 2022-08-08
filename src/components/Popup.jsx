import React from 'react'
import { NavLink, Outlet } from 'react-router-dom';
import { close } from '../images/index'

function Popup({ popup,setPopup }) {
  // console.log(typeof setPopup);
  return (
    <div id='popup' className={`flex bg-black fixed inset-0  justify-center items-center text-white`}>
      <div className='w-fit px-10 py-5 bg-first border-2 border-green-700 rounded-lg relative'>
        <NavLink  to={'/'} className='w-8 aspect-square rounded-full bg-slate-500 hover:bg-red-500 duration-200 flex justify-center items-center absolute right-1 top-1 delay-100'>
          <img src={close} alt="" />
        </NavLink>
        <Outlet  />

      </div>
    </div>
  )
}

export default Popup;