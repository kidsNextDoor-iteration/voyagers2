import React, { useEffect, useState} from 'react';
import { Gallery } from "react-grid-gallery";
import deleteIcon from '../Images/deleteIcon.png';

import ImageUpload from './ImageUpload.jsx';
import Moodboard from './Moodboard.jsx';

const TripDetails = ({ tripId, closePopup, fetchTrips }) => {
  const [fetchedTrip, setFetchedTrip] = useState(null)

// fetch trip details when refreshed
  useEffect(() => {
    if (tripId) {
    // console.log('useEffect ', tripId);
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
      // <div className="trip-container">
      //   <div className="overlay" onClick={closePopup} ></div>
      //   <div className="trip-content">
      //       <div className="button-container">
      //         <form onSubmit={handleFormSubmit}>
      //           <button className="buttonEditTrip" type="submit" name="action" value="update">Edit Trip</button>
      //           <button className="buttonDeleteTrip" type="submit" name="action" value="delete">Delete Trip</button>
      //         </form>
      //       </div>
      //       <div className="tripDetails-container">
      //           Dates: {fetchedTrip.startdate && new Date(fetchedTrip.startdate).toLocaleDateString('en-US', {
      //         day: '2-digit',
      //         month: 'short',
      //         year: 'numeric',
      //       })} - {fetchedTrip.enddate && new Date(fetchedTrip.enddate).toLocaleDateString('en-US', {
      //         day: '2-digit',
      //         month: 'short',
      //         year: 'numeric',
      //       })} <br /><br />
      //       City: {fetchedTrip.city} <br /><br />
      //       Brand: {fetchedTrip.brand} <br /><br />
      //       Description: {fetchedTrip.description} <br /><br />
      //       Idea: {fetchedTrip.idea} <br /><br />
      //       Status: {fetchedTrip.status}
      //       <ImageUpload fetchedTripId={fetchedTrip.tripid}/>  

      //       </div>
      //       <button className="buttonClose" onClick={closePopup}>
      //       X
      //       </button>
      //   </div>
      // </div>





      <div className="trip-container">
      <div className="overlay" onClick={closePopup} ></div>
      <div className="trip-content">
        <div className='trip-content-left-container'>

          <div className='td-top-container'>
            <h1 className='trip-details-text-header'>Trip Details</h1>
            <hr className='trip-details-hr'/>
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

            <div className="button-container">
              <form onSubmit={handleFormSubmit}>
                <button className="buttonEditTrip" type="submit" name="action" value="update">Edit Trip</button>
                <button className="buttonDeleteTrip" type="submit" name="action" value="delete">Delete Trip</button>
              </form>
            </div>
          </div>
        </div>

          <div className='td-bot-container'>
            <h1 className='image-upload-text-header'>Upload Image</h1>
            <hr className='trip-details-hr'/>
            <div className='td-bot-inner'>
              <ImageUpload fetchedTripId={fetchedTrip.tripid}/>  
            </div>
          </div>

        
          </div>
          <button className="buttonClose" onClick={closePopup}>
          X
          </button>

        <div className='trip-content-right-container'>
          <div className='right-top-text-container'>
            <h1 className='image-upload-text-header'>Mood Board</h1>
            <hr className='trip-details-hr'/>
          </div>
          <Moodboard fetchedTripId={fetchedTrip.tripid} />
        </div>

      </div>




    </div>

  )
  }
}

export default TripDetails;