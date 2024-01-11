import React from "react";
import { Route, Routes, Link } from "react-router-dom";
// import components
import Login from "./Login.jsx"
import Signup from "./Signup.jsx"
// import style


function App() {

  return (

      <Routes>
        <Route path="/" element={<h1>Root page</h1>} />
        <Route path="/signup" element={<Signup/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/home" element={<h1>home page</h1>} />
      </Routes>

  )
}
 
export default App;