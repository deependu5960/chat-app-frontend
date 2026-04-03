import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css'
import Credential from './pages/signin_page/credential'
import Signin_box from './components/signin/signin';
import Login_box from './components/signin/login';
import Home from './pages/home_page/home';
import Friends from './pages/friends_page/friends_page';
import Chatbox from './pages/Chatbox_page/chatbox';
import Chat_home from './pages/Chat_page/chat_home';



function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home/>}>
            <Route path='/' element={<Chat_home/>}/>
            <Route path='/user/:id' element={<Chatbox/>}/>
            {/* <Route path='/friends' element={<Friends/>}/> */}
            <Route path='/friends' element={<Friends/>}/>
          
          </Route>
          <Route element={<Credential/>}>
            <Route path='/login' element={<Login_box/>}/>
            <Route path='/signup' element={<Signin_box/>}/>
          </Route>

        </Routes>
      </BrowserRouter>

    </>
  )
}

export default App
