import React, { useState } from "react";
import { FaRegComment, FaRegHeart, FaHeart, FaComment } from "react-icons/fa";
import { RiDeleteBinLine } from "react-icons/ri";
import { Button, Modal } from "keep-react";

import { LuPencilLine } from "react-icons/lu";
import axios from "axios";
import EditProjectModal2 from "./EditProjectModal2";
import apiUrl from "../apiConfig";

export default function Projects({ props }) {
  const [like, setlike] = useState(true);
  const [comment, setcomment] = useState(false);
  const [showprojectmodal, setshowprojectmodal] = useState(false);
  const setinglike = () => {
    setlike(!like);
  };
  const commentadd = () => {
    setcomment(!comment);
  };
  const [showModal, setShowModal] = useState(false);
  const onClick = () => {
    console.log(props);
    setShowModal(!showModal);
  };

  const handleDeleteProject = async () => {
    try {
      const response = await axios.post(
        apiUrl.profile.deleteprofile + props.token,
        {
          projects: props.item,
        }
      );
      console.log(response);
      if (response.status == 200) {
        // alert("Deleted Successfully");
        setShowModal(!showModal);
        // Reload the page after successful deletion
        // window.location.reload();
      } else {
        console.log(response.message);
      }
    } catch (error) {
      console.log(error.response.body);
    }
  };

  const handleEdit = () => {
    setshowprojectmodal(!showprojectmodal);
  };
  return (
    <div className=" p-4 m-2 ">
      {showprojectmodal && (
        <EditProjectModal2
          vieweditprofile={showprojectmodal}
          setvieweditprofile={setshowprojectmodal}
          values={props.item}
        />
      )}
      <Modal
        icon={<RiDeleteBinLine size={28} color="#1B4DFF" />}
        size="md"
        show={showModal}
        position="center"
      >
        <Modal.Header>Delete Project</Modal.Header>
        <Modal.Body>
          <div className="space-y-6">
            <p className="text-body-4 leading-relaxed text-metal-500">
              Are you sure you want to delete your project?
            </p>
          </div>
        </Modal.Body>
        <Modal.Footer className="flex w-full justify-end">
          <Button type="outlineGray" onClick={onClick}>
            Cancel
          </Button>
          <Button type="primary" color="error" onClick={handleDeleteProject}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
      <div className=" flex gap-8 justify-between w-[90%]">
        <div className="flex gap-4">
          <div className="h-[50px]  aspect-square bg-slate-400"></div>
          <div>
            <h1>{props.item.Title}</h1>
            <p className="text-sm">{props.item.company}</p>
            <p className="text-sm text-gray-600">
              {" "}
              {props.item.fromMonth} {props.item.fromYear} -{" "}
              {props.item.toMonth} {props.item.toYear}
            </p>
            <p className="">
              {" "}
              <b>skills: </b>
              {props.item.skills.map((item, key) => (
                <span key={key}>{item} </span>
              ))}
            </p>
            {/* <p>Description: </p> */}
            <p className="text-sm text-justify w-full">
              {props.item.description}
            </p>
          </div>
        </div>
        {!props.publicview && (
          <div className="w-auto h-[32px] flex gap-4 md:flex-row flex-col">
            <div
              className=" p-2 hover:bg-slate-200 rounded-full duration-150 cursor-pointer"
              onClick={handleEdit}
            >
              <LuPencilLine size={17} />
            </div>

            <div
              className="p-2 hover:bg-slate-200 rounded-full duration-150 cursor-pointer"
              onClick={onClick}
            >
              <RiDeleteBinLine size={17} />
            </div>
          </div>
        )}
      </div>
      {/* <div className="w-full flex justify-around my-4 p-2">
        {like ? (
          <div
            className="flex flex-row justify-center items-center gap-2 cursor-pointer"
            onClick={setinglike}
          >
            <FaRegHeart size={20} />
            <p className=" hidden sm:flex text-lg ">Like</p>
          </div>
        ) : (
          <div
            className="flex flex-row justify-center items-center gap-2 cursor-pointer"
            onClick={setinglike}
          >
            <FaHeart size={20} color="red" />
            <p className=" hidden sm:flex text-lg ">Unlike</p>
          </div>
        )}

        <div className="flex flex-row justify-center items-center gap-2 cursor-pointer" onClick={commentadd}>
            {
                comment ? 
                
                <FaComment size={20}/>
                :
                <FaRegComment size={20} />
            }
          <p className=" hidden sm:flex text-lg">Comment</p>
        </div>
      </div>

      {
        comment && 
        <form action="" className="flex flex-col justify-center items-center gap-6">
            <textarea name="comment" id="comment" cols="20" rows="5" className="w-full border-2 border-black rounded-xl p-4 ">

            </textarea>
            <button
            type="submit"
            className="bg-blue-800 hover:bg-blue-900 duration-300 text-white font-bold py-2 px-4 rounded-xl"
          >
            Submit
          </button>
        </form>
      } */}

      <hr className=" text-center w-[95%] mt-4" />
    </div>
  );
}
