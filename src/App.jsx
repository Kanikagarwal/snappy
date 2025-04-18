import { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Register from './Pages/Register'
import Login from './Pages/Login'
import Chat from './Pages/Chat'
import Dp from './Pages/Dp'
import SetAvatar from './Pages/SetAvatar'
function App() {
  

  return (
    <>
     <BrowserRouter>
     <Routes>
      <Route path="/register" element={<Register />}/>
      <Route path="/login" element={<Login />}/>
      <Route path="/setAvatar" element={<SetAvatar />}/>
      <Route path="/upload" element={<Dp />}/>
      <Route path="/" element={<Chat />}/>
     </Routes>
     </BrowserRouter>
    </>
  )
}

export default App
