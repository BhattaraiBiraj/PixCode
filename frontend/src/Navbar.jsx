import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [selectedPage, setSelectedPage] = useState(0)
  const [username, setUsername] = useState(null)
  const navigate = useNavigate()

  const handleSelectedPage = (index) => {
    setSelectedPage(index);
  }

  useEffect(() => {
    const savedUsername = localStorage.getItem('username');
    const token = localStorage.getItem('token');
    if (token && savedUsername) {
      setUsername(savedUsername);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    setUsername(null);
    navigate('/');
  };

  return (
    <>
      <nav class="navbar navbar-expand-lg bg-body-tertiary border mb-5">
        <div class="container-fluid">
          <Link class="navbar-brand ms-2 ms-md-5 me-2 me-md-4" to="/" onClick={() => handleSelectedPage(0)}><img src="pixcode-logo.svg" className="navbar-logo"></img></Link>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav">
              <li class="nav-item">
                <Link class="nav-link" to="/" onClick={() => handleSelectedPage(0)}><span className={`und ${selectedPage == 0 ? "fixedUnd" : ""}`}>Home</span></Link>
              </li>
              <li class="nav-item">
                <Link class="nav-link" to="/retrieve" onClick={() => handleSelectedPage(1)}><span className={`und ${selectedPage == 1 ? "fixedUnd" : ""}`}>Retrieve</span></Link>
              </li>
              {username && (
                <li class="nav-item">
                  <Link class="nav-link" to="/history" onClick={() => handleSelectedPage(2)}><span className={`und ${selectedPage == 2 ? "fixedUnd" : ""}`}>History</span></Link>
                </li>
              )}
            </ul>
            <ul class="navbar-nav ms-auto align-items-lg-center">
              {username ? (
                <>
                  <li class="nav-item d-flex align-items-center gap-2 me-lg-3">
                    <span className="user-avatar">{username.charAt(0).toUpperCase()}</span>
                    <span class="nav-link mb-0 p-0">{username}</span>
                  </li>
                  <li class="nav-item">
                    <button class="nav-link" onClick={handleLogout} style={{ border: 'none', background: 'none', cursor: 'pointer' }}>Logout</button>
                  </li>
                </>
              ) : (
                <>
                  <li class="nav-item">
                    <Link class="nav-link" to="/login" onClick={() => handleSelectedPage(3)}><span className={`und ${selectedPage == 3 ? "fixedUnd" : ""}`}>Login</span></Link>
                  </li>
                  <li class="nav-item">
                    <Link class="nav-link" to="/signup" onClick={() => handleSelectedPage(4)}><span className={`und ${selectedPage == 4 ? "fixedUnd" : ""}`}>Signup</span></Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  )
}