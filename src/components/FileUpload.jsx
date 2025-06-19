import React, { useEffect, useState } from 'react';

const FileUpload = ({setBannerImage,image}) => {
  const [editImage,setEditImage]=useState(image)
  const [file, setFile] = useState('');
  const [progress, setProgress] = useState(0);
  const [uploading, setUploading] = useState(false);
  useEffect(()=>{
    setBannerImage(file);

  },[file])

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      // Simulate the file upload progress
      setUploading(true);
      let uploadProgress = 0;
      const progressInterval = setInterval(() => {
        uploadProgress += 5;
        if (uploadProgress <= 100) {
          setProgress(uploadProgress);
        } else {
          clearInterval(progressInterval);
        }
      }, 100);
    }
  };

  const handleRemoveFile = () => {
    setFile(null);
    setProgress(0);
    setUploading(false);
    setEditImage("")
  };

  return (
    <div className="w-full max-w-full  bg-white  rounded-xl mt-2">
      {/* File Upload Section */}
     {
        !file && !editImage && (
            <div className="border-dashed border-2 border-gray-300 p-12 text-center rounded-xl cursor-pointer w-full">
            <input
              type="file"
              className="hidden"
              id="file-upload-input"
              onChange={handleFileChange}
              accept="image/*"  // Allow all image file types
            />
            <label htmlFor="file-upload-input" className="block text-sm text-gray-600 cursor-pointer">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-600 mx-auto">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                <polyline points="17 8 12 3 7 8"></polyline>
                <line x1="12" x2="12" y1="3" y2="15"></line>
              </svg>
              <span className="font-semibold text-gray-800">Drop your file here or browse</span>
            </label>
            <p className="mt-2 text-xs text-gray-400">Pick an image file.</p>
          </div>
        )
      }

      {/* File Preview Section */}
      {file && (
        <div className="mt-6 p-3 bg-white border border-solid border-gray-300 rounded-xl w-full">
          <div className="flex justify-between items-center mb-2">
            <div className="flex items-center gap-x-3">
              <span className=" w-12 flex justify-center items-center bg-gray-200 text-gray-500 ">
                <img className="rounded-lg" src={URL.createObjectURL(file)} alt="file-thumbnail" />
              </span>
              <div>
                <p className="text-sm font-medium text-gray-800 truncate">{file.name}</p>
              </div>
            </div>
            <button type="button" onClick={handleRemoveFile} className="text-gray-500 hover:text-gray-800">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
                <path d="M3 6h18"></path>
                <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
                <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
                <line x1="10" x2="10" y1="11" y2="17"></line>
                <line x1="14" x2="14" y1="11" y2="17"></line>
              </svg>
            </button>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
            <div
              className="bg-primaryColor h-2 rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <div className="w-10 text-right">
            <span className="text-sm text-gray-800">{progress}%</span>
          </div>
        </div>
      )}
       {editImage && (
        <div className="mt-6 p-3 bg-white border border-solid border-gray-300 rounded-xl w-full">
          <div className="flex justify-between items-center mb-2">
            <div className="flex items-center gap-x-3">
              <span className=" w-12 flex justify-center items-center bg-gray-200 text-gray-500 ">
                <img crossOrigin="anonymous" className="rounded-lg" src={`https://localhost:5000/upload/${editImage}`} alt="file-thumbnail" />
              </span>
              <div>
  <p className="text-sm font-medium text-gray-800 truncate">
    {editImage}
  </p>
</div>

            </div>
            <button type="button" onClick={handleRemoveFile} className="text-gray-500 hover:text-gray-800">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
                <path d="M3 6h18"></path>
                <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
                <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
                <line x1="10" x2="10" y1="11" y2="17"></line>
                <line x1="14" x2="14" y1="11" y2="17"></line>
              </svg>
            </button>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
            <div
              className="bg-primaryColor h-2 rounded-full transition-all duration-500"
              style={{ width: `100%` }}
            ></div>
          </div>
          {/* <div className="w-10 text-right">
            <span className="text-sm text-gray-800">{progress}%</span>
          </div> */}
        </div>
      )}
    </div>
  );
};

export default FileUpload;
