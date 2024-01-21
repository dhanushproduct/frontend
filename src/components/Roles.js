import React, {useState} from 'react'
import jobRoles from '../asserts/Jobroles';
export default function Roles() {
    const [rolekey, setrolekey] = useState(Object.keys(jobRoles)[0]);
    const handlehover = (item) => {
      setrolekey(item)
    }
  return (
    <div>
        
    <div className="md:flex justify-center hidden  ">

<div className="flex w-[90%] p-2 justify-center font-medium">
  <div className=" border-r-2 p-4 m-2 w-[30%]">
    <h1 className="font-semibold text-xl my-2">Roles</h1>
    <ul>
      {Object.keys(jobRoles).map((item, key) => <li className="my-2 text-md hover:text-blue-400 hover:cursor-pointer duration-200" key={key} onMouseEnter={() => handlehover(item)}>{item}</li>)}
      
    </ul>
  </div>
  <div className="w-[70%] roles p-4 m-2">
<h1 className="font-semibold text-xl my-2">Specialties</h1>
{rolekey && (
<div>
{/* Divide the roles into three columns */}
<div className="flex flex-wrap">
  {[...Array(3)].map((_, colIndex) => (
    <div key={colIndex} className="w-[33%]">
      <ul>
        {jobRoles[rolekey]
          .filter((_, index) => index % 3 === colIndex)
          .map((role, key) => (
            <li key={key} className="p-2 text-md">{role}</li>
          ))}
      </ul>
    </div>
  ))}
</div>
</div>
)}
</div>

</div>
</div>
    </div>
  )
}
