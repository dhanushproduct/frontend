import React, { useEffect, useState } from 'react';
import { Toggle } from 'keep-react';
import { IoMdSave } from "react-icons/io";
import { IoReload } from "react-icons/io5";



export default function ToggleOptions({publicview,setpublicview}) {
  const data = {
    1: 'Recognitions',
    2: 'Projects',
    3: 'Skills',
    4: 'Experience',
    5: 'Education',
  };
  const buttontextstyle = "text-xs lg:text-lg md:text-md"


  const [toggles, setToggles] = useState(
    Object.fromEntries(Object.keys(data).map((key) => [key, false]))
  );

  const handleToggleChange = (key) => {
    setToggles((prevToggles) => ({
      ...prevToggles,
      [key]: !prevToggles[key],
    }));
  };


  return (
    <div>
      {!publicview && 
      <div>
        <div className='underline underline-offset-8 text-xl'>
          Public View : 
      </div>
      <br />
    <table className='w-full'>
      {/* <thead>
        <tr>
          <th>Item</th>
          <th>Toggle</th>
        </tr>
      </thead> */}
      <tbody>
        {Object.entries(data).map(([key, label]) => (
          <tr key={key}>
            <td  className='flex items-center'>{label}</td>
            <td>
              <Toggle
                bgColor='primary'
                size='md'
                checked={toggles[key]}
                onChange={() => handleToggleChange(key)}
              />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
    <br />
    <div className="border-2 px-2 py-1 rounded-3xl bg-blue-200 border-blue-200 hover:bg-blue-300 hover:border-blue-300 cursor-pointer bg-opacity-70 border-opacity-70">
            <div className="flex gap-1 justify-center items-center">
            <IoReload size={20}/> <p className={buttontextstyle}>Set to previous look</p>
              
            </div>
      </div>
      <br />
    <div className="border-2 px-2 py-1 rounded-3xl bg-blue-200 border-blue-200 hover:bg-blue-300 hover:border-blue-300 cursor-pointer bg-opacity-70 border-opacity-70">
            <div className="flex gap-1 justify-center items-center">
            <IoMdSave size={20}/> <p className={buttontextstyle}>Save</p>
              
            </div>
      </div>
      </div>
      }
      
  </div>
    
  );
}
