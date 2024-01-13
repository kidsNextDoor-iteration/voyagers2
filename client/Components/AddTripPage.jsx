import React from "react";

import {Button, CalendarCell, CalendarGrid, CalendarGridBody, CalendarGridHeader, CalendarHeaderCell, DateInput, DateRangePicker, DateSegment, Dialog, FieldError, Group, Heading, Label, Popover, RangeCalendar, Text} from 'react-aria-components';

const AddTripPage = ()=>{

  async function addTripFetch(){
    const title = document.querySelector('#title').value;
    const location = document.querySelector('#location').value;
    const brand = document.querySelector('#brand').value;
    const description = document.querySelector('#description').value;

    if(!title | !location | !brand | !description) return alert('Please fill all input fields');

    const reqData = await JSON.stringify({
      title,
      location,
      brand,
      description
    })

    const req = await fetch(url, {
      method: 'POST',
      headers: { 'Content-type': 'application/json'},
      body: reqData,
    })

    const respStatus = req.status;
  }

  return(
    <div className="addTrip-container">
      <div id="button-container">
        <button type="button" id='publishButton'>Publish Trip</button>
      </div>
      
    <div className="content-container">
      <form action="">
        <label htmlFor="title">What would you like to name this trip?</label><br/>
        <input type="text" id="title"/><br/>

        <label htmlFor="location">Location</label><br/>
        <input type="text" id="location"/><br/>

        <label htmlFor="brand">Brand</label><br/>
        <input type="text" id="brand"/><br/>
        
        <label htmlFor="description">Description</label><br/>
        <input type="text" id="description"/><br/>
      </form>

      <div className="calender-container">
        <DateRangePicker>
          <Group>
            <div id="calender-header">
              <span>Start</span>
              <DateInput slot="start">
                {(segment) => <DateSegment segment={segment} />}
              </DateInput>
            </div>
            <div>
              <span>End</span>
              <DateInput slot="end">
                {(segment) => <DateSegment segment={segment} />}
              </DateInput>
            </div>
          </Group>

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
      </div>

    </div>
    </div>
  )
}


export default AddTripPage;