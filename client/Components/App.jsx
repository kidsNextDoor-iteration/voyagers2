import React from "react";
import { Route, Routes, Link } from "react-router-dom";
// import components

// import style


function App() {

  return (

      <Routes>
        <Route path="/" element={<h1>Root page</h1>} />
        <Route path="/signup" element={<h1>sign up page</h1>} />
        <Route path="/home" element={<h1>home page</h1>} />
      </Routes>

  )
}
 
export default App;