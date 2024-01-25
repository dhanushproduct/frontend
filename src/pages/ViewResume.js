import React, { useState } from 'react';
import { useEffect } from 'react';
// import { Worker, Viewer } from '@react-pdf-viewer/pdfjs';
import { Worker } from '@react-pdf-viewer/core';
import { Viewer } from '@react-pdf-viewer/core';
import apiUrl from '../apiConfig';
import { FaSpinner } from "react-icons/fa";

import axios from 'axios';
import '@react-pdf-viewer/core/lib/styles/index.css';

const ViewResume = () => {
  const [pdfUrl, setPdfUrl] = useState('');
  const token = localStorage.getItem("token");
  const [loading,setLoading] = useState(true);

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
