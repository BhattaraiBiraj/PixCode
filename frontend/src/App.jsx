import { useState } from 'react'
import { Routes, Route, Link } from 'react-router-dom';
import Form from './Form'
import Retrieve from './Retrieve'
import Navbar from './Navbar';
import Footer from './Footer'
import Signup from './Signup';
import Login from './Login'
import History from './History'
import ForgotPassword from './ForgotPassword';

function App() {

  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar />
      <div className="flex-grow-1">
        <Routes>
          <Route path="/" element={<Form />} />
          <Route path="/retrieve" element={<Retrieve />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/history" element={<History />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
        </Routes>
      </div>
      <Footer />
    </div>
  )
}

export default App
