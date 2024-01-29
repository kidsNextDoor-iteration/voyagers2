const db = require('../model.js');

const tripController = {};

// functionality to get all user trips from database
tripController.getTrips = (req, res, next) => {
  //removed camel casing from startdate and enddate
  //testing uses userid returned from this query to confirm only trips for the correct user are returned. if this code changes, testing will need to 
  //be adjusted to accomodate that change
  const tripQuery = `
    SELECT userId, tripId, startdate, enddate, city, brand, description, idea, status FROM trips WHERE userId = $1
  `
  // to update value functionality to access current user (through cookies/ sessions)
  const value = [req.cookies.userid];
  try {
    db.query(tripQuery, value)
      .then(data => {
        // console.log('trips retrieved from db in tripController ', data.rows);
        res.locals.trips = data.rows;
        return next();
      })
  }
  catch (err) {
    return next({
      log: 'tripController.getTrips - error getting user trips',
      status: 500,
      message: { err: 'tripController.getTrips - error getting user trips'
      }
    })
  }
}

// functionality to pull one trip from database
tripController.getTripDetails = (req, res, next) => {
    const tripQuery = `
      SELECT startDate, endDate, city, brand, description, idea, status FROM trips WHERE tripId = $1
    `
    const value = [req.query.tripId];
    // console.log(value);
    try {
      db.query(tripQuery, value)
        .then(data => {
          res.locals.trip = data.rows;
          return next();
        })
    }
    catch (err) {
      return next({
        log: 'tripController.getTripDetails - error getting user trip',
        status: 500,
        message: { err: 'tripController.getTripDetails - error getting user trip'
        }
      })
    }
  }

  tripController.editTrip = (req, res, next) => {
    const editQuery = `
      UPDATE trips
      SET startDate = $2, endDate = $3, city = $4, brand = $5, description = $6, idea = $7, status = $8
      WHERE tripId = $1
    `
    const value = [req.query.tripId, req.body.startDate, req.body.endDate, req.body.city, req.body.brand, req.body.description, req.body.idea, req.body.status];
    console.log('editTrip ', value);
  try {
    db.query(editQuery, value)
      .then(data => {
        console.log("editTrip data.rows ", data.rows);
        res.locals.trip = data.rows;
        return next();
      })
  }
  catch (err) {
    return next({
      log: 'tripController.getTripDetails - error getting user trip',
      status: 500,
      message: { err: 'tripController.getTripDetails - error getting user trip'
      }
    })
  }
  }

  tripController.addTrip = (req, res, next) => {
    try{
      const userid = req.cookies.userid;
      const { title, city, brand, description, startDate, endDate, idea} = req.body;
      const value = [userid, city, brand, description, startDate, endDate, idea];
      const addQuery = 
      `INSERT INTO trips
      (userid, city, brand, description, startdate, enddate, idea)
      VALUES 
      ($1, $2, $3, $4, $5, $6, $7)
      RETURNING tripid, userid, city, brand, description, startdate, enddate, idea`;
      
      db.query(addQuery, value)
      .then(data => {
        res.locals.addedTrip = data.rows;
        return next();
      })
    }
    catch(error){
      return next({
        log: 'tripController.addTrip - error adding user trip: '+ error,
        status: 500,
        message: { err: 'tripController.addTrip - error adding user trip'}
      })
    }
  }

  // to delete trip
  tripController.deleteTrip = (req, res, next) => {
    const deleteQuery = `DELETE FROM trips WHERE tripId = $1`
    const value = [req.query.tripId];
    try {
      db.query(deleteQuery, value)
        .then(data => {
          return next();
        })
    }
    catch (err) {
      return next({
        log: 'tripController.deleteTrip - error deleting user trip',
        status: 500,
        message: { err: 'tripController.deleteTrip - error deleting user trip'
        }
      })
    }
  }


module.exports = tripController;