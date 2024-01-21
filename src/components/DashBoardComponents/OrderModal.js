// OrderModal.js
import React, { useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import DraggableComponent from "./DraggableComponent";
import { IoMdClose } from "react-icons/io";
import { Fragment, useRef } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { IoIosArrowUp } from "react-icons/io";
const OrderModal = ({
  componentOrder,
  setComponentOrder,
  onClose,
  onSubmit,
}) => {
  const cancelButtonRef = useRef(null);
  const [open, setOpen] = useState(true);

  const handleDrop = (draggedId, targetId) => {
    const newOrder = [...componentOrder];
    const draggedIndex = componentOrder.indexOf(draggedId);
    const targetIndex = componentOrder.indexOf(targetId);
    newOrder[draggedIndex] = targetId;
    newOrder[targetIndex] = draggedId;
    setComponentOrder(newOrder);
  };
  const handleArrowClick = (direction, componentId) => {
    // Implement logic to move components using arrow keys
    // Update the component order accordingly
    const newOrder = [...componentOrder];
    const selectedIndex = newOrder.indexOf(componentId);

    if (direction === "up" && selectedIndex > 0) {
      const temp = newOrder[selectedIndex];
      newOrder[selectedIndex] = newOrder[selectedIndex - 1];
      newOrder[selectedIndex - 1] = temp;
    } else if (direction === "down" && selectedIndex < newOrder.length - 1) {
      const temp = newOrder[selectedIndex];
      newOrder[selectedIndex] = newOrder[selectedIndex + 1];
      newOrder[selectedIndex + 1] = temp;
    }

    setComponentOrder(newOrder);
  };

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        initialFocus={cancelButtonRef}
        onClose={setOpen}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-screen items-start justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-xl bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg mx-4">
                <div className=" w-[100%] h-[70%] bg-white rounded-xl border-2 p-4 ">
                  <div className="flex w-full items-end justify-between py-4 cursor-pointer">
                    <div className=" font-semibold text-xl">
                      Customise the order to Sections
                    </div>
                    <IoMdClose size={30} onClick={onClose} />
                  </div>
                  <div className="text-sm">
                    Drag and drop the section or just click on the arrows to
                    arrange
                  </div>
                  <div className="modal">
                    <div className="modal-content ">
                      <div>
                        <DndProvider backend={HTML5Backend}>
                          {componentOrder.map((componentId) => (
                            <DraggableComponent
                              key={componentId}
                              id={componentId}
                              onDrop={(draggedId, targetId) => {
                                handleDrop(draggedId, targetId);
                              }}
                            >
                              {renderComponent(componentId, handleArrowClick)}
                            </DraggableComponent>
                          ))}
                        </DndProvider>
                      </div>
                              <div className="w-full flex justify-end">

                      <button
                        onClick={onSubmit}
                        className="bg-blue-800 hover:bg-blue-900 text-white font-bold py-2 px-4 rounded-xl md:w-[30%] w-[100%] my-4 md:my-0"
                        >
                        Arrange
                      </button>
                          </div>
                    </div>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

const updown = (handleArrowClick, componentId) => {
  return (
    <div className="arrow-buttons flex justify-end gap-4 ">
      <button
        onClick={() => handleArrowClick("up", componentId)}
        // className="w-[40%] my-4 py-4 px-2 border border-black rounded-xl "
      >
        <IoIosArrowUp />
      </button>
      <button
        onClick={() => handleArrowClick("down", componentId)}
        // className="w-[40%] my-4 py-4 px-2 border border-black rounded-xl "
      >
        <IoIosArrowUp className=" rotate-180" />
      </button>
    </div>
  );
};

const renderComponent = (componentId, handleArrowClick) => {
  // Implement your logic to render components based on the componentId
  // For simplicity, you can use a switch statement
  switch (componentId) {
    case "Recognitions":
      return (
        <div className="w-[95%] font-inter font-semibold capitalize px-4 py-2 flex justify-between border-2 rounded-lg my-4 mx-2 hover:bg-gray-100 cursor-move hover:border-black">
          recognitions {updown(handleArrowClick, componentId)}
        </div>
      );
    case "ProjectsComponent":
      return (
        <div className="w-[95%] font-inter font-semibold capitalize px-4 py-2 flex justify-between border-2 rounded-lg my-4 mx-2 hover:bg-gray-100 cursor-move hover:border-black">
          {" "}
          projects {updown(handleArrowClick, componentId)}
        </div>
      );
    case "SkillsComponent":
      return (
        <div className="w-[95%] font-inter font-semibold capitalize px-4 py-2 flex justify-between border-2 rounded-lg my-4 mx-2 hover:bg-gray-100 cursor-move hover:border-black">
          skills{updown(handleArrowClick, componentId)}
        </div>
      );
    case "ExperienceComponent":
      return (
        <div className="w-[95%] font-inter font-semibold capitalize px-4 py-2 flex justify-between border-2 rounded-lg my-4 mx-2 hover:bg-gray-100 cursor-move hover:border-black">
          Experience{updown(handleArrowClick, componentId)}
        </div>
      );
    case "EducationComponent":
      return (
        <div className="w-[95%] font-inter font-semibold capitalize px-4 py-2 flex justify-between border-2 rounded-lg my-4 mx-2 hover:bg-gray-100 cursor-move hover:border-black">
          Education {updown(handleArrowClick, componentId)}
        </div>
      );
    default:
      return null;
  }
};

export default OrderModal;
