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
        console.log(trips)
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
      <div><br />
        <button className="buttonAddTrip" onClick={togglePop}>Add Trip</button>
        {buttonPopup? <Login toggle={togglePop} /> : null}
      </div>
      {trips.map((tile, index) => (
        <div key={index} className="tile">
          <Row height={150}>
            <Col md={4} width={150}>
                <div>
              {/* <img
                className="tripImage" 
                src=""
                alt="" 
              /> */}
              </div>
              <div className="tileDetails">
                {tile.startDate} - {tile.endDate}
                {tile.city}
              </div>
            </Col>
          </Row>
        </div>
      ))}
    </div>
  )
}

export default Trips;