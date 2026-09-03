import { useState } from "react";
import axios from 'axios';


export default function Form (){
   const [selectedFile, setSelectedFile] = useState(null)
   const [imgCode, setImgCode] = useState("")
   const [previewUrl, setPreviewUrl] = useState(null)
   const [isDragging, setIsDragging] = useState(false);

   const handleFile = (file) => {
    if (!file) return;
    setSelectedFile(file);
    setPreviewUrl(URL.createObjectURL(file));
  };

   const handleFileChange = (e) =>{
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
   const handleSubmit = async(e) =>{
    e.preventDefault();

    if(!selectedFile){
        alert("add the file");
        return;
    }

    const formdata = new FormData()
    formdata.append('image', selectedFile);

    const res = await axios.post("http://localhost:8080/api/upload", formdata);
    setImgCode(res.data.code)


   }
    return(
        <div>
            <form onSubmit={handleSubmit}>
        Upload an image: <input type="file" onChange={handleFileChange} />
        <button type="submit">Upload</button>
        <div 
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          style={{
            border: isDragging ? '2px dashed blue' : '2px dashed gray',
            borderRadius: '8px',
            padding: '20px',
            width: '300px',
            height: '200px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: isDragging ? '#eef' : '#fafafa',
            cursor: 'pointer',
          }}
            >
                {previewUrl ? (
            <img
              src={previewUrl}
              alt="preview"
              style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }}
            />
          ) : (
            <p>Drag & drop an image here, or choose a file below</p>
          )}
            </div>
      </form>
      {imgCode && <p>Your code: {imgCode}</p>}
    </div>
    )
}
