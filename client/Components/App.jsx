import React from "react";
import { Route, Routes, Link } from "react-router-dom";

// import components
import Signin from "./Signin.jsx"
import Signup from "./Signup.jsx"
import ImageUpload from "./ImageUpload.jsx";
import HomePage from "./homePage.jsx";
import Trips from "./Trips.jsx"
import AddTripPage from "./AddTripPage.jsx";
import UnderConstruction from "./UnderConstruction.jsx";
import '../Styles/AddTripPage.scss'
import "../stylesheets/styles.scss"
import ProtectedRoute from "../Components/Utilities/ProtectedRoute.jsx"

function App() {

  return (
    <div>
      <Routes>
        <Route path="/" element={
          <ProtectedRoute>
            <Trips />
          </ProtectedRoute>
        } />

        <Route path="/internal/signup" element={<Signup />} />
        <Route path="/internal/signin" element={<Signin />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/imageDemo" element={<ImageUpload />} />
        <Route path="/trips" element={<Trips />} />
        <Route path="/trip/addtrip" element={<AddTripPage />} />
        <Route path="/moodboard" element={<UnderConstruction />} />
        <Route path="/collaborations" element={<UnderConstruction />} />
      </Routes>
    </div>
  )
}

export default App;