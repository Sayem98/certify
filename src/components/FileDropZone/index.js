import React, { useState } from 'react';
import './index.css';


const FileDropZone = ({files = [], setFiles}) => {
  const [isDragging, setIsDragging] = useState(false);
  

  const handleDragEnter = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);

    const droppedFiles = Array.from(e.dataTransfer.files);
    setFiles(droppedFiles);
  };

  return (
    <div
      className={`file-drop-zone h-[20rem] flex flex-col justify-center items-center ${isDragging ? 'is-dragging'  : ''}`}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      {isDragging ? <div>Drop files here</div> : <div>Drag and drop files here</div>}
      {files.length > 0 && (
        <ul>
          {files.map((file, index) => (
            <li key={index}>{file.name}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default FileDropZone;
