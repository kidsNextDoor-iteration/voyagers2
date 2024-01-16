import React from "react";
import { Route, Routes, Link } from "react-router-dom";
// import components
import Signin from "./Signin.jsx"
import Signup from "./Signup.jsx"
import HomePage from "./homePage.jsx"
import Trips from "./Trips.jsx"
import AddTripPage from "./AddTripPage.jsx";
// import style
import styles from "../stylesheets/styles.scss"

<h1>Root page</h1>  
import '../Styles/AddTripPage.scss'

function App() {

  return (
    <div>
      <Routes>
        <Route path="/" element={<h1>Root page</h1>} />
        <Route path="/signup" element={<Signup/>} />
        <Route path="/signin" element={<Signin/>} />
        <Route path="/home" element={<HomePage/>} />
        <Route path="/trips" element={<Trips />} />
        <Route path="/addtrip" element={<h1>add trip page</h1>} />
        <Route path="/addtrip" element={<AddTripPage/>} />
      </Routes>
      </div>
  )
}
 
export default App;