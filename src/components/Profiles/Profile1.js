import { Upload } from "keep-react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import ReLogin from "../../pages/ReLogin";
import axios from 'axios';
import apiUrl from "../../apiConfig";

export default function Profile1({ formdetails }) {
  const token = localStorage.getItem("token");

  const { control, handleSubmit,setValue } = useForm();
  // const [file, setFile] = useState(null); // State to store the selected file
  const navigate = useNavigate();
  const [fileName, setFileName] = useState("");

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
        formdetails.uploadedFile = result.link; // Adjust based on your backend response
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

  const validateFile = () => {
    if (!fileName) {
      return false;
    }
    if (fileName.type === "application/pdf") {
      return true;
    }
    return false;
  };

  if (token == null) {
    return <ReLogin />;
  } else {
    return (
      <div>
          <div className=" h-1 w-full flex">
        <div className="h-full bg-blue-900 w-[16%]"></div>
        <div className="h-full bg-white w-[84%]"></div>
      </div>
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
    );
  }
}
