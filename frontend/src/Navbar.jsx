import { useState } from "react";
import { Link } from "react-router-dom";

export default function Navbar () {
  const [selectedPage, setSelectedPage]  =useState(0)

  const handleSelectedPage = (index) =>{
    setSelectedPage(index);
  }
    return (
        <>
            <nav class="navbar navbar-expand-lg bg-body-tertiary border mb-5">
  <div class="container-fluid">
    <Link class="navbar-brand ms-2 ms-md-5 me-2 me-md-4" to="/" ><img src="pixcode-logo.svg" className="navbar-logo"></img></Link>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNav">
      <ul class="navbar-nav">
        <li class="nav-item">
          <Link class="nav-link" to="/" onClick={()=>handleSelectedPage(0)}><span className={`und ${selectedPage==0? "fixedUnd" : ""}`}>Home</span></Link>
        </li>
        <li class="nav-item">
          <Link class="nav-link" to="/retrieve" onClick={()=>handleSelectedPage(1)}><span className={`und ${selectedPage==1? "fixedUnd" : ""}`}>Retrieve</span></Link>
        </li>
      </ul>
    </div>
  </div>
</nav>
        </>
    )
}