import { useState } from "react"
import axios from 'axios';

export default function Retrieve(){

    const [code,setCode] = useState("");
    const [imageUrl, setImageUrl] = useState("")
    
    const handleCode = (e) =>{
        setCode(e.target.value);
    }

    const handleSubmit = async(e) =>{
        e.preventDefault();
         
        let res = await axios.get(`http://localhost:8080/api/image/${code}`)
        console.log(res.data.imageUrl)
        setImageUrl(res.data.imageUrl);
    
    }

    return(
        <div>
            <form onSubmit={handleSubmit}>
                Enter a code to get : 
                <input type="text" value={code} onChange={handleCode}/>
                <button type="submit">Get</button>
            </form>
            {imageUrl && 
                <div>
                    <img src={imageUrl}></img>
                </div>
            }
        </div>
    )
}