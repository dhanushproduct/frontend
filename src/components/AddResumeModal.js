import { IoMdClose } from "react-icons/io";
import { Fragment, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import apiUrl from "../apiConfig";
import { useForm } from "react-hook-form";
import { Upload } from "keep-react";



export default function AddResumeModal({showaddresumemodal,setShowaddresumemodal}) {

    const [fileName, setFileName] = useState("");
    const { control, handleSubmit,setValue } = useForm();
    const cancelButtonRef = useRef(null);
    const [open, setOpen] = useState(true);
    // const { handleSubmit, register, formState: errors } = useForm();
    const navigate = useNavigate();
    const token = localStorage.getItem("token");
    const closemodal = () => {
      setShowaddresumemodal(!showaddresumemodal)
    };

    const handleFileChange = (event) => {
      const file = event.target.files[0];
      if (file) {
        setFileName(file.name);
        // Set the value of the 'file' field in the form
        setValue('file', file);
      }
    };
  
    // const onFileChange = (event) => {
    //   const selectedFile = event.target.files[0];
    //   setFile(selectedFile);
    // };
  
    const onFileSubmit = async (data) => {
      console.log("Hello");
      console.log(fileName);
      console.log(data.file);
      try {
        const formData = {};
        formData['file'] = data.file;
        // formData.append('file', data.file);
        console.log(formData);
        // Send the file to the backend using Axios
        const response = await axios.post(`${apiUrl.profile.addresume}${token}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`,
          },
        });
  
        if (response.status === 200) {
          const result = response.data;
        //   formdetails.uploadedFile = result.link; // Adjust based on your backend response
          navigate(`/profile/page2/${token}`);
        } else {
          console.error('File upload failed');
          // Handle the error as needed
        }
      } catch (error) {
        console.error('Error uploading file', error);
        // Handle the error as needed
      }
    };

  return (
    <div>
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
                  <div className="flex w-full items-end justify-end py-4 cursor-pointer">
                    <IoMdClose size={30} onClick={closemodal} />
                  </div>

                  {/* <div className=" h-1 w-full flex">
                    <div className="h-full bg-blue-900 w-[16%]"></div>
                    <div className="h-full bg-white w-[84%]"></div>
                </div> */}
                    <div className="m-4 relative">
                        <div className="text-center py-3 text-2xl font-bold font-sans">
                            Upload a Resume/CV
                        </div>
                    <div>
                        <form
                        onSubmit={handleSubmit(onFileSubmit)}
                        className="flex flex-col p-4 justify-center"
                        >
                        <Upload
                            className="p-4 my-4"
                            required
                            onFileChange={(file) => {
                            handleFileChange(file); // Call your handleFileChange function with the file object
                            }}
                            file={fileName}
                        />
                        {/* {fileName && (
                        <div className="mb-4">
                        <embed
                        src={URL.createObjectURL(fileName)}
                        width="100%"
                            height="500"
                            />
                        </div>
                    )} */}
                        {/* {!validateFile() && (
                        <p className="text-red-500">Please enter a valid PDF file.</p>
                    )} */}
                        <div className="flex flex-row-reverse">
                            <button
                            type="submit"
                            className="bg-blue-800 hover:bg-blue-900 text-white font-bold py-2 px-4 rounded-xl md:w-[40%] w-[100%] my-4 md:my-0"
                            >
                            Save & Continue
                            </button>
                        </div>
                        </form>
                    </div>
                    </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
    </div>
  )
}
