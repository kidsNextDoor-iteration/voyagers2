import React, { useEffect, useState} from 'react';

const TripDetails = ({ tripId, setTrip, closePopup }) => {
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

  if (!fetchedTrip) {
    return null}

  else {
    return (
      <div className="trip-container">
        <div className="overlay"></div>
        <div className="trip-content">
            <div className="button-container">
              <button className="buttonEditTrip">Edit Trip</button>
              <button className="buttonDeleteTrip">Delete Trip</button>
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