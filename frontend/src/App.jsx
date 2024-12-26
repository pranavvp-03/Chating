import React from 'react'
import Navbar from './components/Navbar'
import HomePage from './pages/HomePage'
import SignUpPage from './pages/SignUpPage'
import LoginPage from './pages/LoginPage'
import SettingsPage from './pages/SettingsPage'
import ProfilePage from './pages/ProfilePage'
import {Routes,Route, Navigate} from "react-router-dom"
import { useAuthStore } from "./store/useAuthStore"
import { useEffect } from "react"
import { Loader} from "lucide-react"
const App = () => {
  const {authUser,checkAuth,isCheckingAuth} = useAuthStore()
  useEffect(()=>{
    checkAuth()
  },[checkAuth])
  console.log({authUser},"is it auth user")
  if(isCheckingAuth && !authUser) return (
    <div className='flex justify-center items-center h-screen'>
      <Loader className="size-10 animate-spin"/>
    </div>
  )
  return (
    <>
    <Navbar/>
     
     <Routes>
     <Route path="/signup" element = {!authUser ?<SignUpPage/> : <Navigate to = "/"/>} />
       {/* <Route path="/" element = {authUser ?<HomePage/>: <Navigate to = "/login"/>} />
       <Route path="/signup" element = {!authUser ?<SignUpPage/> : <Navigate to = "/"/>} />
       <Route path="/login" element = {!authUser ?<LoginPage/> : <Navigate to = "/"/>} />
       <Route path="/settings" element = {<SettingsPage/>} />
       <Route path="/profile" element = {authUser?<ProfilePage/>:<Navigate to = "/login"/>} /> */}
     </Routes>
    </>
  )
}

export default App
