import { useState } from "react"
import axios from 'axios';

export default function Retrieve(){

    const [code,setCode] = useState("");
    const [imageFound, setImageFound] = useState(false)
    const [imageUrl, setImageUrl] = useState("")
    const [message, setMessage] = useState("")
    const [error, setError] = useState("")

    const API_URL = import.meta.env.VITE_API_URL;
    
    const handleCode = (e) =>{
        setCode(e.target.value);
        setImageFound(false)
    }

    const handleSubmit = async(e) =>{
        e.preventDefault();
        let res = await axios.get(`${API_URL}/api/image/${code}`)
        setImageUrl(res.data.imageUrl);
        setImageFound(true)
        setMessage(res.data.msg)
        setError(res.data.err)
    
    }

    const handleDownload = async () =>{
        const res = await fetch(imageUrl);
        const blob = await res.blob()

        const blobUrl = window.URL.createObjectURL(blob);

        const link = document.createElement('a');
        link.href = blobUrl;
        link.download = `image-${code}.jpg`;
         document.body.appendChild(link);
        link.click();
        document.body.removeChild(link)
        window.URL.revokeObjectURL(blobUrl);
    }

    return(
        <div className="upload-card">
            <form onSubmit={handleSubmit}>
                <label htmlFor="retrieve-input" className="mb-3">Enter code to get image</label>
                <br />
                <input type="text" id="retrieve-input" className="retrieve-input" placeholder="eg.  AI6G3K" value={code} onChange={handleCode}/>
                <div className="mt-3">
                    {message ? <p>{message}</p> : <p style={{color:"red"}}>{error}</p> }
                </div>
                
                <button type="submit" className="upload-btn" disabled={imageFound}>Get</button>
            </form>
            {imageUrl && 
                <div>
                    <div className="retrieve-img-box">
                    <img src={imageUrl} className="retrieve-img"></img>
                    </div>
                    <button onClick={handleDownload} className="upload-btn download-btn">Download</button>
                </div>
            }
        </div>
    )
}