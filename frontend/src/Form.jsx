import { useState } from "react";
import axios from 'axios';


export default function Form() {
  const [selectedFile, setSelectedFile] = useState(null)
  const [imgCode, setImgCode] = useState("")
  const [previewUrl, setPreviewUrl] = useState(null)
  const [isDragging, setIsDragging] = useState(false);
  const [isUploaded, setIsUploaded] = useState(false)

  const API_URL = import.meta.env.VITE_API_URL;

  const handleFile = (file) => {
    if (!file) return;
    setSelectedFile(file);
    setIsUploaded(false)
    setImgCode("")
    setPreviewUrl(URL.createObjectURL(file));
  };

  const handleFileChange = (e) => {
    handleFile(e.target.files[0])
  }

  //this is for drag and drop
  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    handleFile(file);
  };
  //for submitt
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedFile) {
      alert("add the file");
      return;
    }

    const formdata = new FormData()
    formdata.append('image', selectedFile);
    setIsUploaded(true)
    const res = await axios.post(`${API_URL}/api/upload`, formdata);
    setImgCode(res.data.code)


  }
  return (
    <div className="d-flex justify-content-center upload-card">
      <form onSubmit={handleSubmit}>
        <label htmlFor="fileInput" className="choose-file-btn">Choose File</label>
        <input type="file" id="fileInput" className="file-input-hidden" accept="image/*" onChange={handleFileChange} />
        <span className="file-name">{selectedFile ? selectedFile.name : "No file chosen"}</span>

        <button type="submit" className="upload-btn" disabled={isUploaded || false}>Upload</button>
        {imgCode && <div>
               <p style={{
                border: "1px solid grey",
                width:"50%",
                margin:"30px auto 5px auto",
                textCenter:"center",
                fontSize:"20px"
            }}><b>{imgCode}</b></p>
               <p className="text-muted">Use this code to retrieve the image.</p>
            </div>}
        <label
        htmlFor="fileInput"
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          style={{
            border: isDragging ? '2px dashed blue' : '2px dashed gray',
            borderRadius: '8px',
            padding: '20px',
            width: '400px',
            height: '400px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: isDragging ? '#eef' : '#fafafa',
            cursor: 'pointer',
            margin: "40px auto"
          }}
        >
          {previewUrl ? (
            <img
              src={previewUrl}
              alt="preview"
              style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }}
            />
          ) : (
            <p>Drag & drop an image here, or choose a file</p>
          )}
        </label>
      </form>

    </div>
  )
}
