import { Link } from "react-router-dom";

export default function Footer() {
    return (
        <>
            <div className="border bg-light">
                <div className="container">
                    <div className="row mt-3">
                        <div className="col-12 col-md-5">
                            <img src="pixcode-logo.svg" style={{width:"120px"}} className="mb-3"></img>
                            <p className="lh-lg text-muted">This is a site where you can upload and retrieve the image anywhere in the world using the code.</p>
                        </div>
                        <div className="col-md-2"></div>
                        <div className="col-12 col-md-5">
                            <h5 className="mb-4">Links</h5>
                            
                                <p><Link to="/retrieve" className="text-decoration-none text-reset">Retrieve Image</Link></p>
                                <p><a href="https://github.com/bhattaraibiraj/pixcode" className="text-decoration-none text-reset" target="_blank">Source Code</a></p>
                                <p><a href="https://github.com/bhattaraibiraj" className="text-decoration-none text-reset" target="_blank">Github</a></p>
                            
                        </div>
                    </div>
                    <div className="row text-center mt-5">
                        <p className="text-muted">PixelCode &copy; 2026. All right reserved.</p>
                        <p className="text-muted">Developer : Biraj Bhattarai</p>
                    </div>
                </div>
            </div>


        </>
    )
}