import React, { useEffect, useState} from 'react';
import { Gallery } from "react-grid-gallery";
import deleteIcon from '../Images/deleteIcon.png';
import {Button, CalendarCell, CalendarGrid, CalendarGridBody, CalendarGridHeader, CalendarHeaderCell, DateInput, DateRangePicker, DateSegment, Dialog, FieldError, Group, Heading, Label, Popover, RangeCalendar, Text} from 'react-aria-components';

import ImageUpload from './ImageUpload.jsx';
import Moodboard from './Moodboard.jsx';

const TripDetails = ({ tripId, closePopup, fetchTrips }) => {
  const [fetchedTrip, setFetchedTrip] = useState(null);
  const [editedTrip, setEditedTrip] = useState(null);
  const [editMode, setEditMode] = useState(false);

// fetch trip details when refreshed
  const getTripDetails = () => {
    fetch(`/getTripDetails?tripId=${tripId}`)
      .then(res => res.json())
      .then(data => {
        setFetchedTrip(data[0]);
        setEditedTrip(data[0]);
        console.log('fetched trip ', fetchedTrip)
        console.log('edited trip ', editedTrip)
        setEditMode(false);
      }).catch(err => {
        console.log('error in fetching /getTripDetails in TripDetails.jsx')
      })
  }
  
  useEffect(() => {
    if (tripId) {
      getTripDetails()
    }
  } , [tripId])

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
    if (e.nativeEvent.submitter.value === 'update') {
      handleEditButton(e);
    }
  }

  // event handler to set editMode when edit button is clicked
  const handleEditButton = (e) => {
    e.preventDefault();
    console.log('Edit Button Clicked!')
    setEditMode(!editMode);
    if (! editMode) {
      setEditedTrip(fetchedTrip)
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedTrip(prevTrip => ({
      ...prevTrip,
      [name]: name.includes('Date') ? new Date(value) : value,
    }));
  };

  const editTrip = () => {     
    fetch(`/editTrip?tripId=${tripId}`,
    { method: 'PATCH',
      body: JSON.stringify(editedTrip),
      headers: {
        'Content-Type': 'application/json',
      }
    }).then(res => {
      if (res.ok) {
        console.log('in Edit Trip React jsx')
        getTripDetails();
      } else {
        console.error('Error editing trip:', res.statusText);
      }
    }).catch(err => {
      console.log('error in /editTrip in TripDetails.jsx')
    })
  }

  const handleEditSubmit = (e) => {
    e.preventDefault();
    editTrip();
    getTripDetails();
    setEditMode(false);
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
              {/* {editMode ? (
                <div className="edittripDetails-container">
                <form onSubmit={handleEditSubmit}>
                  <label>Dates:</label><br /> 
                  <input 
                    type="text"
                    name="startDate"
                    value={editedTrip.startdate instanceof Date ? editedTrip.startdate.toLocaleDateString('en-US', {
                      day: '2-digit',
                      month: 'short',
                      year: 'numeric',
                    }) : editedTrip.startdate}
                    onChange={handleInputChange} /> 
              - 
              <input 
                type="text"
                name="endDate"
                value={ editedTrip.enddate instanceof Date ? editedTrip.enddate.toLocaleDateString('en-US', {
                  day: '2-digit',
                  month: 'short',
                  year: 'numeric',
                }) : editedTrip.enddate}
                onChange={handleInputChange} /> 
                <br /><br /> */}
              {/* <div className="calender-container">
        <DateRangePicker>
          <div className="date-container">
            <div id="calender-header">
              <span>Start</span>
              <DateInput slot="start">
                {(segment) => <DateSegment segment={segment} />}
              </DateInput>
            </div>
            <hr />
            <div id="calender-header">
              <span>End</span>
              <DateInput slot="end">
                {(segment) => <DateSegment segment={segment} />}
              </DateInput>
            </div>
          </div>

          <Dialog>
            <RangeCalendar>
              <header>
                <Button slot="previous">◀</Button>
                <Heading />
                <Button slot="next">▶</Button>
              </header>
              <CalendarGrid>
                {(date) => <CalendarCell date={date} />}
              </CalendarGrid>
            </RangeCalendar>
          </Dialog>
        </DateRangePicker>
      </div> */}
            {/* <label>City:</label><br />
            <input 
              type="text" 
              name="city"
              value={editedTrip.city || ''}
              onChange={handleInputChange} /><br /><br />
            <label>Brand:</label><br /> 
            <input 
              type="text"
              name="brand" 
              value={editedTrip.brand || ''}
              onChange={handleInputChange} /> <br /><br />
            <label>Description:</label><br />
            <input 
              type="text"
              name="description" 
              value={editedTrip.description || ''}
              onChange={handleInputChange} /> <br /><br />
            <label>Idea:</label><br />
            <input 
              type="text"
              name="idea"
              value={editedTrip.idea || ''}
              onChange={handleInputChange} /> <br /><br /> */}
            {/* <label>Status:</label> 
            <input 
              type="text"
              name="status" 
              value={fetchedTrip.status}
              onChange={handleInputChange} /> */}
            {/* <button type="submit">Save Edits</button>
            <button type="button" onClick={() => setEditMode(false)}>Cancel</button>
          </form>
          </div>
              ) : ( */}
                {/* <> */}
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
            {/* Status: {fetchedTrip.status} */}
            </div>
            {/* </> */}
          {/* )} */}
          </div>
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

  )
  }
}

export default TripDetails;