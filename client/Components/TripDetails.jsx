import React, { useEffect, useState} from 'react';

const TripDetails = ({ tripId, setTrip, closePopup }) => {
  
  // fetch trip details when refreshed
//   useEffect(() => {
//     fetch(`/getTripDetails?tripId=${tripId}`)
//       .then(res => res.json())
//       .then(data => {
//         setTrip(data);
//         console.log('fetching trip ', tripId);
//       }).catch(err => {
//         console.log('error in fetching /getTripDetails in TripDetails.jsx')
//       })
//   }, [])

    return (
      <div className="trip-container">
        {/* <div className="overlay"></div>
        <div className="popup-content">
            <div className="tripDetails-container">
                Dates: {tripId.startdate && new Date(tripId.startdate).toLocaleDateString('en-US', {
              day: '2-digit',
              month: 'short',
              year: 'numeric',
            })} - {tripId.enddate && new Date(tripId.startdate).toLocaleDateString('en-US', {
              day: '2-digit',
              month: 'short',
              year: 'numeric',
            })} <br />
            City: {tripId.city}
            </div>
            <button className="buttonClose" onClick={closePopup}>
            X
            </button>
        </div> */}
      </div>
  )
}


export default TripDetails;