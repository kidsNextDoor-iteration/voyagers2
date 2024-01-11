import React from "react";
import { Route, Routes, Link } from "react-router-dom";
// import components
import HomePage from "./homePage.jsx";

// import style


function App() {

  return (

      <Routes>
        <Route path="/" element={HomePage} />
        <Route path="/signup" element={<h1>sign up page</h1>} />
        <Route path="/home" element={<h1>home page</h1>} />
      </Routes>

  )
}
 
export default App();