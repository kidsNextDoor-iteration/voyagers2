import React, { useEffect, useState} from 'react';
import { Gallery } from "react-grid-gallery";
import deleteIcon from '../Images/deleteIcon.png';

import ImageUpload from './ImageUpload.jsx';

const TripDetails = ({ tripId, closePopup, fetchTrips }) => {
  const [fetchedTrip, setFetchedTrip] = useState(null)

// fetch trip details when refreshed
  useEffect(() => {
    if (tripId) {
    console.log('useEffect TripDetails ', tripId);
    fetch(`/getTripDetails?tripId=${tripId}`)
      .then(res => res.json())
      .then(data => {
        setFetchedTrip(data[0]);
      }).catch(err => {
        console.log('error in fetching /getTripDetails in TripDetails.jsx')
      })}
  }, [tripId])

  // functionality when update button is clicked and when delete button is clicked
  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (e.nativeEvent.submitter.value === 'delete') {
      fetch(`/deleteTrip?tripId=${tripId}`,
        {method: 'DELETE'
      }).then(res => {
        if (res.ok) {
          fetchTrips();
          closePopup();
        } else {
          console.error('Error deleting trip:', res.statusText);
        }
      }).catch(err => {
          console.log('error in fetching /deleteTrip in TripDetails.jsx')
        })
    }
    // include update button here
  }

  // if fetchedTrip is not falsey (only when a trip image is clicked on and trip fetched, would something be rendered)
  if (!fetchedTrip) {
    return null}

  else {
    return (
      <div className="trip-container">
        <div className="overlay" onClick={closePopup} ></div>
        <div className="trip-content">
            <div className="button-container">
              <form onSubmit={handleFormSubmit}>
                <button className="buttonEditTrip" type="submit" name="action" value="update">Edit Trip</button>
                <button className="buttonDeleteTrip" type="submit" name="action" value="delete">Delete Trip</button>
              </form>
            </div>
            <div className="tripDetails-container">
                Dates: {fetchedTrip.startdate && new Date(fetchedTrip.startdate).toLocaleDateString('en-US', {
              day: '2-digit',
              month: 'short',
              year: 'numeric',
            })} - {fetchedTrip.enddate && new Date(fetchedTrip.enddate).toLocaleDateString('en-US', {
              day: '2-digit',
              month: 'short',
              year: 'numeric',
            })} <br /><br />
            City: {fetchedTrip.city} <br /><br />
            Brand: {fetchedTrip.brand} <br /><br />
            Description: {fetchedTrip.description} <br /><br />
            Idea: {fetchedTrip.idea} <br /><br />
            Status: {fetchedTrip.status}
            <ImageUpload fetchedTripId={fetchedTrip.tripid}/>  

            </div>
            <button className="buttonClose" onClick={closePopup}>
            X
            </button>
        </div>
  


      </div>
  )
  }
}

export default TripDetails;