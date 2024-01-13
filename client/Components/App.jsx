import React from "react";
import { Route, Routes, Link } from "react-router-dom";
// import components
import Signin from "./Signin.jsx"
import Signup from "./Signup.jsx"
import HomePage from "./homePage.jsx"
import AddTripPage from "./AddTripPage.jsx";
// import style
<h1>Root page</h1>  
import '../Styles/AddTripPage.scss'

function App() {

  return (

      <Routes>
        <Route path="/" element={<h1>Root page</h1>} />
        <Route path="/signup" element={<Signup/>} />
        <Route path="/signin" element={<Signin/>} />
        <Route path="/home" element={<HomePage/>} />
        <Route path="/addtrip" element={<AddTripPage/>} />
      </Routes>

  )
}
 
export default App;