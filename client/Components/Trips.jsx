import React, { useEffect, useState} from 'react';
import { Row, Col } from 'react-bootstrap';

//import components
import Header from "./Header.jsx";
import Login from "./Login.jsx";

import '../Styles/trips.scss';

const Trips = () => {
  // set state for button popup status
  const [buttonPopup, setButtonPopup] = useState(false)

  // create button functionality where a popup component is rendered when button is clicked
  const togglePop = () => {
    setButtonPopup(!buttonPopup);
  };

  // set state for list of trips
  const [trips, setTrips] = useState([]);

  // fetch trips from database when refreshed
  // NOTE: to create getTrips api
  useEffect(() => {
    fetch('/getTrips')
      .then(res => res.json())
      .then(data => {
        setTrips(data);
        console.log('trips from Trips.jsx ', data)
      }).catch(err => {
        console.log('error in fetching /getTrips in Trips.jsx')
      })
  }, [])

  // set state for list of images
  const [tripImages, setTripImages] = useState([])

  // fetch trip images from database when refreshed
  // NOTE: to create getTrips api
  useEffect(() => {
    fetch('/getImages')
      .then(res => res.json())
      .then(data => {
        setTripImages(data);
        console.log(tripImages);
      }).catch(err => {
        console.log('error in fetching /getImages in Trips.jsx')
      })
  }, [])

  return (
    <div>
      <Header />
      <div>
        <button className="buttonAddTrip" onClick={togglePop}>Add Trip</button>
        {buttonPopup ? 
          <div className="popup">
            <div className="overlay"></div>
            <div className="poup-content">
              <Login />
              <button className="buttonClose" onClick={togglePop}>
                X
              </button>
            </div>
          </div>
        : null}
      </div>
      <Row className="tileRow">
      {trips.map((tile, index) => (
        <Col md={4} key={index} className="tileCol">
       
                <div>
                <img
                  className="tripImage" 
                  src=""
                  alt="" 
                />
              </div>
              <div className="tileDetails">
                {tile.startdate && new Date(tile.startdate).toLocaleDateString('en-US', {
                  day: '2-digit',
                  month: 'short',
                  year: 'numeric',
                })} - {tile.enddate && new Date(tile.startdate).toLocaleDateString('en-US', {
                  day: '2-digit',
                  month: 'short',
                  year: 'numeric',
                })}
                <br />
                {tile.city}
              </div>
            </Col>
      ))}
    </Row>
    </div>
  )
}

export default Trips;