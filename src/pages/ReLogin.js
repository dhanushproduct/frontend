import React from 'react'
import { useNavigate } from 'react-router-dom'
import error from "../asserts/error.png"

export default function ReLogin() {
  const navigate = useNavigate()
  
  const handleLogin = () => {
    navigate("/login")
  }
  return (
   <div className='h-[80vh] w-full flex justify-center items-center'>
    <img src={error} alt="" className='md:h-[90%] opacity-20 absolute -z-100' />
    <div className='flex flex-col h-full w-full justify-center items-center gap-6 z-0'>
      <div className='md:text-5xl text-2xl font-semibold'>You have to login</div>
      <div className='md:text-3xl text-lg text-center'> Click on the below button to redirect to login poge</div>
      <button className="bg-blue-800 hover:bg-blue-900 text-white font-bold py-2 px-2 rounded-xl md:w-[30%] w-[80%] my-4 md:my-0" onClick={handleLogin}>Go to Login Page</button>
    </div>

   </div>
  )
}