import React, { useState } from 'react';
import { useEffect } from 'react';
// import { Worker, Viewer } from '@react-pdf-viewer/pdfjs';
import { Worker } from '@react-pdf-viewer/core';
import { Viewer } from '@react-pdf-viewer/core';
import apiUrl from '../apiConfig';
import { FaEdit} from "react-icons/fa";

import { FaSpinner } from "react-icons/fa";

import axios from 'axios';
import '@react-pdf-viewer/core/lib/styles/index.css';
import AddResumeModal from '../components/AddResumeModal';

const ViewResume = () => {
  const buttontextstyle = "text-xs lg:text-lg md:text-md"

  const [pdfUrl, setPdfUrl] = useState('');
  const token = localStorage.getItem("token");
  const [loading,setLoading] = useState(true);
  const [showaddresumemodal,setShowaddresumemodal] = useState(false);


  const handleButtonClick = async () => {
    console.log('Clicked')
    // const objectUrl = 'your-s3-object-url'; // Replace with the actual Object URL of your PDF
    // const apiUrl = `your-backend-api-url/getpdf/${encodeURIComponent(objectUrl)}`;
    console.log(token);
    try {
    //   const response = await fetch();
      const response = await axios.get(`${apiUrl.profile.getresume}${token}`,{ responseType: 'arraybuffer' });
      console.log(response.data);
    // Create a Blob from the array buffer
    const pdfBlob = new Blob([response.data], { type: 'application/pdf' });

    // Create a Blob URL from the response data
    const blobUrl = URL.createObjectURL(pdfBlob);
    setLoading(false);
    setPdfUrl(blobUrl);
    } catch (error) {
      console.error(error);
      // Handle error, show an alert, etc.
    }
  };

  const handleEditResume = () =>{
      setShowaddresumemodal(!showaddresumemodal);
  }

//   const handleButtonClick = async () => {
    
//   };

  useEffect(() => {
    const fetchData = async () => {
        try {
            const response = await axios.get(`${apiUrl.profile.getresume}${token}`, { responseType: 'arraybuffer' });

            // Create a Blob from the array buffer
            const pdfBlob = new Blob([response.data], { type: 'application/pdf' });

            // Create a Blob URL from the response data
            const blobUrl = URL.createObjectURL(pdfBlob);
            setLoading(false);
            setPdfUrl(blobUrl);
        } catch (error) {
            console.error(error);
            // Handle error, show an alert, etc.
        }
    };

    fetchData();
  }, [token]); // Empty dependency array ensures it runs only once on mount

  return (
    <div>
    {
        loading && (
            <div className='flex justify-center items-center h-full'>
            <FaSpinner className="animate-spin text-blue-800 mr-2" />
          </div>
        )
    }
        {showaddresumemodal && (
            <AddResumeModal
              showaddresumemodal={showaddresumemodal}
              setShowaddresumemodal={setShowaddresumemodal}
            />
          )}
     <div className='flex justify-end md:px-2 py-2'>
        <div
          className="border-2 px-2 py-1 rounded-3xl bg-blue-200 border-blue-200 hover:bg-blue-300 hover:border-blue-300 cursor-pointer bg-opacity-70 border-opacity-70"
          onClick={handleEditResume}
        >
          <div className="flex gap-1 justify-center items-center">
            <FaEdit size={15} />
            <p className={buttontextstyle}>
              Upload New Resume
            </p>
          </div>
        </div>
      </div>
    <br />
    <div style={{ paddingLeft: '20px', paddingRight: '20px' }}>
    {pdfUrl && (
      <div style={{ width: '100%', height: '90vh' }}>
        <Worker workerUrl={`https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js`}>
          <Viewer fileUrl={pdfUrl} />
        </Worker>
      </div>
    )}
  </div>
  </div>
  );
};

export default ViewResume;
