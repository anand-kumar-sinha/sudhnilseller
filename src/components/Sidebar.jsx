import React from 'react'
import { NavLink } from 'react-router-dom'
import { assets } from '../assets/assets'

const Sidebar = () => {
  return (
    <div className='w-[18%] min-h-screen border-r-2 '>
      <div className=' flex flex-col pt-6 pl-[20%] text-[15px] gap-3'>
        <NavLink className='flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-l' to="/dashboard">
            <img className='w-5 h-5' src={assets.add_icon}/>
            <p className='hidden md:block'>Dashboard</p>
        </NavLink>
        <NavLink className='flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-l' to="/add">
            <img className='w-5 h-5' src={assets.add_icon}/>
            <p className='hidden md:block'>Add Items</p>
        </NavLink>

        <NavLink className='flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-l' to="/list">
            <img className='w-5 h-5' src={assets.order_icon}/>
            <p className='hidden md:block'>List Items</p>
        </NavLink>

        <NavLink className='flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-l' to="/orders">
            <img className='w-5 h-5' src={assets.order_icon}/>
            <p className='hidden md:block'>Orders</p>
        </NavLink>
        <NavLink className='flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-l' to="/notifications">
            <img className='w-5 h-5' src={assets.order_icon}/>
            <p className='hidden md:block'>Notifications</p>
        </NavLink>
        <NavLink className='flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-l' to="/me">
            <img className='w-5 h-5' src={assets.order_icon}/>
            <p className='hidden md:block'>Profile</p>
        </NavLink>
       
      </div>
    </div>
  )
}

export default Sidebar