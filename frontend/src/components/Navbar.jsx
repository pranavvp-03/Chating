import React from 'react'
import { useAuthStore } from '../store/useAuthStore'
import { Link, LogOut, MessageSquare, Settings, User } from 'lucide-react';
import { Link as RouterLink } from 'react-router-dom';

function Navbar() {
  const { logout, authUser} = useAuthStore();
  return (
    <div>
     <header
     className='bg-base-100 border-b border-base-300 fixed w-full top-0 z-40 backdrop-blur-lg bg-base-100/80'>
      <div className='"continer mx-auto px-4 h-16'>
        <div className='flex justify-between items-center h-full'>
          <div className='flex items-center gap-8'>
            <RouterLink to="/" className='flex items-center gap-2.5 hover:opacity-80 transition-all'>
             <div className='size-9 rounded-lg bg-primary/10 flex items-center justify-center'>
                  <MessageSquare className='w-5 h-5 text-primary'/>
              </div>
              <h1 className='text-lg font-bold'>Chatty</h1>
            </RouterLink>
          </div>

          <div className='flex items-center gap-2'>
            <RouterLink
            to={"/settings"}
            className={`btn btn-sm gap-2 transition-colors`}>
              <Settings className='w-4 h-4'/>
              <span className='hidden sm:inline'>Settings</span>
            </RouterLink>

            {authUser && (
              <>
                <RouterLink to={"/profile"} className={`btn btn-sm gap-2`}>
                  <User className='size-5'/>
                  <span className='hidden sm:inline'>Profile</span>
                </RouterLink>

                <button className='flex gap-2 items-center' onClick={logout}>
                  <LogOut className='size-5'/>
                  <span className='hidden sm:inline'>Logout</span>
                </button>
              </>
              
            )}


           

          </div>
        </div>


      </div>

     </header>
    </div>
  )
}

export default Navbar
