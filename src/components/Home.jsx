import React,{ useState,useEffect } from 'react';
import Sidebar from './Sidebar';
import Popup from './Popup';
import { Outlet } from 'react-router-dom';
import { io } from 'socket.io-client';
import { useSelector } from 'react-redux'
import Loading from './Loading';

function Home() {
  const [popup, setPopup] = useState(false);
  return (
    <div className='h-screen bg-first text-white flex'>
      <Sidebar setPopup={setPopup} />
      <Outlet />
      <Popup setPopup={setPopup} popup={popup}/>
    </div>
  )
}

export default Home