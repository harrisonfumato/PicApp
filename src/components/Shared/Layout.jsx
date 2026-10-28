import React from 'react'
import Sidebar from './Sidebar';
import { Outlet } from 'react-router-dom'
import Header from './Header.jsx'

const Layout = () => {
  return (
    <div className="bg-neutral-100 h-screen w-screen overflow-hidden flex flex-row">
      <Sidebar />
      <div className="flex flex-col flex-1">
        <Header />
        <div className="flex-1 p-4 min-h-0 overflow-auto">
        <div>
        {<Outlet />}
        </div>
      </div>
      </div>
      
      
    </div>
  )
}

export default Layout

 