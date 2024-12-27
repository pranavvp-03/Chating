import React from 'react'
import { useAuthStore } from '../store/useAuthStore'
import { Link, MessageSquare } from 'lucide-react';
import { Link as RouterLink } from 'react-router-dom';

function Navbar() {
  const { logout, authUser} = useAuthStore();
  return (
    <div>
     <header
     className='bg-base-100 border-b border-base-300 fixed w-full top-0 z-40 backdrop-blur-lg bg-base-100/80'>
      <div className='"continer mx-auto px-4 h-16'>
        <div className='flex justify-between items-center h-full'>
          <RouterLink to="/" className='flex items-center gap-2.5 hover:opacity-80 transition-all'>
            <div className='w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center'>
            <MessageSquare className='w-5 h-5 text-primary'/>

            </div>
          </RouterLink>

        </div>

      </div>

     </header>
    </div>
  )
}

export default Navbar
