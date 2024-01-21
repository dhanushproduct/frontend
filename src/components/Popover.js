"use client";
import { Popover } from "keep-react";
import { IoInformationCircleOutline } from "react-icons/io5";
export const PopoverComponent = () => {
  return (
    <Popover trigger="hover" position="top-end">
      <Popover.Title>Password Requirements</Popover.Title>
      <Popover.Description>
        <ol>
          <li>Be a minimum of 8 characters long.</li>
          <li>Include at least one lowercase letter (a-z).</li>
          <li> Include at least one uppercase letter (A-Z).</li>
          <li>Contain at least one numerical digit (0-9). </li>
          <li>Contain at least one special character such as @$!%*?&.</li>
        </ol>
      </Popover.Description>
      <Popover.Action>
        <div className=" bg-white rounded-full hover:bg-white text-black cursor-pointer ">
          <IoInformationCircleOutline size={25} />
        </div>
      </Popover.Action>
    </Popover>
  );
};
