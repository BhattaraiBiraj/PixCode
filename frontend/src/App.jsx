import { useState } from 'react'
import { Routes, Route, Link } from 'react-router-dom';
import Form from './Form'
import Retrieve from './Retrieve'
import Navbar from './Navbar';
import Footer from './Footer'

function App() {

  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar />
      <div className="flex-grow-1">
        <Routes>
          <Route path="/" element={<Form />} />
          <Route path="/retrieve" element={<Retrieve />} />
        </Routes>
      </div>
      <Footer />
    </div>
  )
}

export default App
