import React from 'react';
import Sidebar from './Sidebar';
import { Outlet } from 'react-router-dom';

function Home() {
  // const [popup, setPopup] = useState(false);
  return (
    <div className='h-screen bg-first text-white flex'>
      <Sidebar  />
      <Outlet />
      {/* <Popup setPopup={setPopup} popup={popup} /> */}
    </div>
  )
}

export default Home