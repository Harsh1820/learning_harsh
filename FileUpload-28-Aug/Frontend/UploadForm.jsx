import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './UploadForm.css';

const UploadForm = () => {
  const [selectedFiles, setSelectedFiles] = useState({
    documents: [],
    images: [],
    videos: [],
  });

  const handleFileChange = (event, category) => {
    const files = Array.from(event.target.files);
    setSelectedFiles((prevState) => ({
      ...prevState,
      [category]: [...prevState[category], ...files],
    }));
  };

  const handleSubmit = (category) => {
    const files = selectedFiles[category];
    if (files.length === 0) {
      alert('No files selected.');
      return;
    }
    uploadFiles(files, category);
  };

  const uploadFiles = (files, category) => {
    files.forEach((file) => {
      const formData = new FormData();
      formData.append('file', file);

      fetch(`http://localhost:3005/uploads/${category}`, {
        method: 'POST',
        body: formData,
      })
        .then((response) => response.json())
        .then((data) => {
          console.log('Success:', data);
        })
        .catch((error) => {
          console.error('Error:', error);
          alert('Upload failed. Please check console for details.');
        });
    });
  };

  const handleDeleteFile = (category, index) => {
    setSelectedFiles((prevState) => ({
      ...prevState,
      [category]: prevState[category].filter((_, i) => i !== index),
    }));
  };

  return (
    <div className="upload-form-container">
      <h1>Upload Your Files</h1>

      <UploadSection
        title="Documents"
        category="documents"
        accept=".doc,.docx,.pdf"
        selectedFiles={selectedFiles.documents}
        handleFileChange={handleFileChange}
        handleSubmit={handleSubmit}
        handleDeleteFile={handleDeleteFile}
      />

      <UploadSection
        title="Profile Pictures"
        category="images"
        accept=".jpg,.jpeg,.gif"
        selectedFiles={selectedFiles.images}
        handleFileChange={handleFileChange}
        handleSubmit={handleSubmit}
        handleDeleteFile={handleDeleteFile}
      />

      <UploadSection
        title="Video"
        category="videos"
        accept=".mp4,.wmv"
        selectedFiles={selectedFiles.videos}
        handleFileChange={handleFileChange}
        handleSubmit={handleSubmit}
        handleDeleteFile={handleDeleteFile}
      />
    </div>
  );
};

const UploadSection = ({
  title,
  category,
  accept,
  selectedFiles,
  handleFileChange,
  handleSubmit,
  handleDeleteFile,
}) => (
  <div className="upload-section">
    <h2>{title}</h2>
    <input
      type="file"
      multiple
      accept={accept}
      onChange={(event) => handleFileChange(event, category)}
      className="file-input"
    />
    <button
      type="button"
      className="upload-button"
      onClick={() => handleSubmit(category)}
    >
      Upload {title}
    </button>
    <ul className="file-list">
      {selectedFiles.map((file, index) => (
        <li key={file.name + index} className="file-item">
          {file.name}
          <button
            type="button"
            className="delete-button"
            onClick={() => handleDeleteFile(category, index)}
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  </div>
);

UploadSection.propTypes = {
  title: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  accept: PropTypes.string.isRequired,
  selectedFiles: PropTypes.arrayOf(PropTypes.object).isRequired,
  handleFileChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  handleDeleteFile: PropTypes.func.isRequired,
};

export default UploadForm;
