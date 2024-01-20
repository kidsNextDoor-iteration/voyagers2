import React, { useEffect, useState} from 'react';
import { Row, Col } from 'react-bootstrap';

//import components
import Header from "./Header.jsx";
import AddTripPage from "./AddTripPage.jsx";
import TripDetails from "./TripDetails.jsx";

import '../Styles/trips.scss';
import imageAlt from '../Images/trip-alt.jpg'

const Trips = () => {
  // set state for button popup status
  const [buttonPopup, setButtonPopup] = useState(false);
  const [trips, setTrips] = useState(null);
  const [tripImages, setTripImages] = useState([]);
  const [tripPopup, setTripPopup] = useState(false);
  const [selectedTrip, setSelectedTrip] = useState('');

  // create button functionality where a popup component is rendered when button is clicked
  const togglePop = () => {
    setButtonPopup(!buttonPopup);
  };

  // prevent scrolling of page while popup is active
  if (buttonPopup) {
    document.body.classList.add('active-popup');
  }  else {
      document.body.classList.remove('active-popup');
  }

  // fetch trips from database when refreshed
  const fetchTrips = () => {
    fetch('/getTrips')
      .then(res => res.json())
      .then(data => {
        setTrips(data);
        console.log('trips from Trips.jsx ', data)
      }).catch(err => {
        console.log('error in fetching /getTrips in Trips.jsx')
      })
  }

  useEffect(() => {
    fetchTrips();
    fetchImages()
  }, [])

  // fetch trip images from database when refreshed
  const fetchImages = () => {
    fetch('/getImages')
      .then(res => res.json())
      .then(data => {
        setTripImages(data);
        console.log(tripImages);
      })
      // .catch(err => {
      //   console.log('error in fetching /getImages in Trips.jsx')
      // })
  }

  // render default image if no trip image is selected
  const addDefaultImg = (e) => {
    e.target.src = imageAlt
  }

  // create functionality where a popup component is rendered when the trip image is clicked
  const toggleTrip = () => {
    setTripPopup(!tripPopup)
  }

  // set functionality for trip
  const handleImageClick = (tripId) => {
    // console.log(trip);
    setTripPopup(true);
    setSelectedTrip(tripId);
  }

  const closePopup = () => {
    setTripPopup(false)
  }

  return (
    <div>
      <Header />

      <div>
        <button className="buttonAddTrip" onClick={togglePop}>Add Trip</button>
        {buttonPopup ? 
          <div className="popup-container">
            <div className="overlay"></div>
            <div className="popup-content">
              <div className="addTrip-container">
                <AddTripPage togglePop={togglePop} fetchImages={fetchImages} fetchTrips={fetchTrips} />
              </div>
              <button className="buttonClose" onClick={togglePop}>
                X
              </button>
            </div>
          </div>
        : null}

      </div>
      <br/>
      {trips === null ? (
        <h1> Loading...</h1>
      ) : trips.length === 0 ? (
        <h1>No upcoming trips. Plan one now!</h1>
      ) : (
      <Row className="tileRow">
      {trips.map((tile, index) => (
        <Col md={4} key={index} className="tileCol">
          <div name={tile.tripid}>
            <img
              className="tripImage" 
              src=""
              alt=""
              onError={addDefaultImg}
              onClick={() => handleImageClick(tile.tripid)}
            />
            {/* <div className="middle">
              <div className="caption">
                {tile.city}
              </div>
            </div> */}
          </div>
          <div className="tileDetails">
            {tile.startdate && new Date(tile.startdate).toLocaleDateString('en-US', {
              day: '2-digit',
              month: 'short',
              year: 'numeric',
            })} - {tile.enddate && new Date(tile.enddate).toLocaleDateString('en-US', {
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
        )}
      
        {tripPopup && (
          <TripDetails tripId={selectedTrip} setTrip={setSelectedTrip} closePopup={closePopup} fetchTrips={fetchTrips} />
        )}
    </div>
  )
}

export default Trips;