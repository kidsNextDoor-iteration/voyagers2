import React from "react";
import { Route, Routes, Link } from "react-router-dom";
// import components

// import style
<h1>Root page</h1>  

function App() {

  return (

      <Routes>
        <Route path="/" element={<h1>sign up page</h1>} />
        <Route path="/signup" element={<h1>sign up page</h1>} />
        <Route path="/signin" element={<h1>sign in page</h1>} />
        <Route path="/home" element={<h1>home page</h1>} />
        <Route path="/addtrip" element={<h1>add trip page</h1>} />
      </Routes>

  )
}
 
export default App;