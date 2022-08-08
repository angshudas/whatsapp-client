import React, { useEffect,useState } from 'react';
import { Route,Routes } from 'react-router-dom';
import Home from './components/Home';
// import Check from './components/Check';
import Auth from './components/Auth';
import Login from './components/Login';
// import AddUser from './components/NewChat';
import Register from './components/Register';
// import { useSelector,useDispatch } from 'react-redux';
import PersistentUser from './components/PersistentUser';
import NewChat from './components/NewChat';
import DeleteChat from './components/DeleteChat';
import UpdateDetails from './components/UpdateDetails';
import UpdatePassword from './components/UpdatePassword';
import Chat from './components/Chat';
import NoChat from './components/NoChat';
// import Popup from './components/Popup';

function App() {

  return (
    // <Popup />
    
    <Routes>
      <Route path='auth' element={<Auth/>} >
        <Route path='login' element={<Login />} />
        <Route path='register' element={<Register/>} />
      </Route>

      <Route path='/' element={<PersistentUser/>} >
        <Route path='/' element={<Home />} >
          <Route path='popup/newchat' element={<NewChat/>} />
          <Route path='popup/deletechat' element={<DeleteChat/>} />
          <Route path='popup/updatedetails' element={<UpdateDetails/>} />
          <Route path='popup/updatepassword' element={<UpdatePassword/>} />
          <Route path='/'>
            <Route path='/' element={<NoChat />}/>
            <Route path='chat/:chat_id' element={<Chat />} />
          </Route>
        </Route>
        
      </Route>

    </Routes>
  )
}

export default App;