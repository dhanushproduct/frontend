import React from "react";
import { LuPencilLine } from "react-icons/lu";
import { RiDeleteBinLine } from "react-icons/ri";
import { useState } from "react";
import { Button, Modal } from "keep-react";
import axios from 'axios';
import EditExpModal2 from "./EditExpModal2";
import apiUrl from "../apiConfig";

export default function TimelineComponent({ props }) {
  const [showModal, setShowModal] = useState(false);
  const [showexpmodal,setshowexpmodal] = useState(false);

  const onClick = () => {
    setShowModal(!showModal);
  };
  const handleDeleteExperience = async () =>{
    try{
        const response = await axios.post(apiUrl.profile.deleteprofile + props.token,{
          jobs : props.item
        });
        console.log(response);
        if(response.status == 200){
          // alert("Deleted Successfully");
          setShowModal(!showModal);
          // Reload the page after successful deletion
          // window.location.reload();
        }
        else{
          console.log(response.message);
        }
    }catch(error){
        console.log(error.response.body);
    }
  }

  const handleEdit = () =>{
      setshowexpmodal(!showexpmodal)
  }
  return (
    <div className="w-full md:p-4 md:m-2 p-2">

      {showexpmodal && (
          <EditExpModal2
            vieweditprofile={showexpmodal}
            setvieweditprofile={setshowexpmodal}
            values={props.item}
          />
        )}
      <Modal
        icon={<RiDeleteBinLine size={28} color="#1B4DFF" />}
        size="md"
        show={showModal}
        position="center"
      >
        <Modal.Header>Delete Experience</Modal.Header>
        <Modal.Body>
          <div className="space-y-6">
            <p className="text-body-4 leading-relaxed text-metal-500">
            Are you sure you want to delete your experience?
            </p>
          </div>
        </Modal.Body>
        <Modal.Footer className="flex w-full justify-end">
          <Button type="outlineGray" onClick={onClick}>
            Cancel
          </Button>
          <Button type="primary" color="error" onClick={handleDeleteExperience}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
      <div className=" flex gap-8  justify-between w-[90%]">
        <div className="flex gap-4">
          <div className="h-[50px]  aspect-square bg-slate-400"></div>
          <div className="px-4">
            <h1>{props.item.jobTitle}</h1>
            <p className="text-sm">{props.item.company}</p>
            <p className="text-sm text-gray-600">
              {props.item.fromMonth} {props.item.fromYear} -{" "}
              {props.item.toMonth} {props.item.toYear}
            </p>
            <p className="">
              {" "}
              <b>skills:</b>
              a, b, c
            </p>
          </div>
        </div>
        {
          !props.publicview &&
          <div className="w-auto h-[32px] flex gap-4 md:flex-row flex-col">
          <div className=" p-2 hover:bg-slate-200 rounded-full duration-150 cursor-pointer" onClick={handleEdit}>
            <LuPencilLine size={17} />
          </div>

          <div className="p-2 hover:bg-slate-200 rounded-full duration-150 cursor-pointer" onClick={onClick}>
            <RiDeleteBinLine size={17} />
          </div>
        </div>
        }
      </div>
      {/* <div className='w-full flex justify-center my-4'>

      <div className='h-[2px] bg-slate-200 w-[95%]'></div>
      </div> */}
      <hr className=" text-center w-[95%] mt-4" />
    </div>
  );
}
