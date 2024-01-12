import React from "react";
import { Route, Routes, Link } from "react-router-dom";
// import components
import HomePage from './HomePage.jsx'
import Login from "./Login.jsx"
import Signup from "./Signup.jsx"
// import style
<h1>Root page</h1>  

function App() {

  return (

      <Routes>
        <Route path="/" element={<h1>Root page</h1>} />
        <Route path="/signup" element={<Signup/>} />
        <Route path="/signin" element={<Login/>} />
        <Route path="/home" element={<HomePage/>} />
        <Route path="/addtrip" element={<h1>add trip page</h1>} />
      </Routes>

  )
}
 
export default App();