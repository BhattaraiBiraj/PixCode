import { useState } from "react";
import axios from 'axios';


export default function Form (){
   const [selectedFile, setSelectedFile] = useState(null)
   const [imgCode, setImgCode] = useState("")
   const handleFileChange = (e) =>{
    setSelectedFile(e.target.files[0])
   }

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
      </form>
      {imgCode && <p>Your code: {imgCode}</p>}
    </div>
    )
}
