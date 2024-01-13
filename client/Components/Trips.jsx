import React, { useEffect, useState} from 'react';
import Header from "./Header.jsx";
// import Login from "./Login.jsx";

const Trips = () => {
  const [buttonPopup, setButtonPopup] = useState(false)

  const togglePop = () => {
    setButtonPopup(!buttonPopup);
  };
  
  return (
    <div>
      <Header />
      <div>
        <button className="buttonAddTrip" onClick={togglePop}>Add Trip</button>
        {/* {buttonPopup? <Login toggle={togglePop} /> : null} */}
      </div>
    </div>
  )
}


export default Trips;