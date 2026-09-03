import { useState } from 'react'
import { Routes, Route, Link } from 'react-router-dom';
import Form from './Form'
import Retrieve from './Retrieve'
import Navbar from './Navbar';
import Footer from './Footer'

function App() {

  return (
    <>
    <Navbar />
    <Routes>
        <Route path="/" element={<Form />} />
        <Route path="/retrieve" element={<Retrieve />} />
    </Routes>
    <Footer />
    </>
  )
}

export default App
