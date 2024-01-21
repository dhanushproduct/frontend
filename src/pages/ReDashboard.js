import React, {useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import error from "../asserts/error.png"
import { toast } from 'react-toastify'

export default function ReDashboard() {
  const navigate = useNavigate()
 useEffect(() => {
  toast.error("You have already logged in!!")
 }, [])
  
  const handleLogin = () => {
    navigate(`/dashboard/${localStorage.getItem("token")}`)
    if(localStorage.getItem("type") === "user"){
        navigate(`/dashboard/${localStorage.getItem("token")}`)
    }
    if(localStorage.getItem("type") === "admin"){
      navigate(`/admindashboard/${localStorage.getItem("token")}`)
  }
  }
  return (
   <div className='h-[80vh] w-full flex justify-center items-center'>
    <img src={error} alt="" className='md:h-[90%] opacity-20 absolute -z-100' />
    <div className='flex flex-col h-full w-full justify-center items-center gap-6 z-0'>
      <div className='md:text-5xl text-2xl font-semibold'>You have already logged in!!</div>
      <div className='md:text-3xl text-lg text-center'> Click on the below button to redirect to Dashboard</div>
      <button className="bg-blue-800 hover:bg-blue-900 text-white font-bold py-2 px-2 rounded-xl md:w-[30%] w-[80%] my-4 md:my-0" onClick={handleLogin}>Go to Dashboard</button>
    </div>

   </div>
  )
}