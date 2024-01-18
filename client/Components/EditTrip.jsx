import React, { useEffect, useState} from 'react';

const EditTrips = () => {

  const editTrip = () => {     
    fetch(`/editTrip?tripId=${tripId}`,
    { method: 'PATCH'
    }).then(res => {
    if (res.ok) {
      getTripDetails();
    } else {
      console.error('Error editing trip:', res.statusText);
    }
    }).catch(err => {
      console.log('error in /editTrip in TripDetails.jsx')
    })
  }

  return (
    <div>
      <form>
        <input></input>
      </form>
    </div>
  )
}

export default EditTrips;