import React from "react";
import { LuPencilLine } from "react-icons/lu";

export default function SkillsComponent({dash, setshowskills, showskills, publicview}) {
  return (
    <div className="space-y-2 w-full p-4 bg-white rounded-xl">
      <div className="text-lg font-medium text-gray-900 flex justify-between p-4">
        Skills{" "}
        {
          !publicview &&
          <div className="flex gap-4">
          <div className=" w-auto p-2 hover:bg-slate-200 rounded-full duration-150 cursor-pointer">
            <LuPencilLine onClick={() => setshowskills(!showskills)} />
          </div>
        </div>
        }
      </div>
      <ul className="flex flex-wrap gap-4 pl-4 text-gray-500 list-none">
        {dash.skills.length != 0 ? (
          dash.skills.map((item, key) => (
            <li
              className=" border-gray-100 hover:bg-slate-100 hover:shadow-lg hover:scale-110 duration-300 cursor-pointer border-2 p-2 rounded-2xl"
              key={key}
            >
              {item}
            </li>
          ))
        ) : (
          <div className="text-center w-full"> No Skills mentioned </div>
        )}
      </ul>
    </div>
  );
}
