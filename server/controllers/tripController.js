const db = require('../model.js');

const tripController = {};

// functionality to get all user trips from database
tripController.getTrips = (req, res, next) => {
  // const tripQuery = `
  //   SELECT tripId, startDate, endDate, city, brand, description, idea, status FROM trips WHERE userId = $1
  // `
  const tripQuery = `
    SELECT trips.tripId, startDate, endDate, city, brand, description, idea, status FROM trips
    LEFT JOIN users_trips
    ON trips.tripId = users_trips.tripId
    WHERE users_trips.userId = $1`
  // to update value functionality to access current user (through cookies/ sessions)
  const value = [req.cookies.userid];
  // console.log(value);
  try {
    db.query(tripQuery, value)
      .then(data => {
        // console.log('data from tripController ',data.rows);
        res.locals.trips = data.rows;
        return next();
      })
  }
  catch (err) {
    return next({
      log: 'tripController.getTrips - error getting user trips',
      status: 500,
      message: {
        err: 'tripController.getTrips - error getting user trips'
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
      message: {
        err: 'tripController.getTripDetails - error getting user trip'
      }
    })
  }
}

tripController.getCompanions = async (req, res, next) => {

  try {

    const tripId = req.query.tripId;
    const results = await db.query(`SELECT users.firstname FROM users_trips INNER JOIN users ON users.userid = users_trips.userid WHERE users_trips.tripid = ${tripId}`)
    const trip = res.locals.trip[0];

    const nameArray = results.rows.map(obj => obj.firstname)
    const output = [{ ...trip, companions: nameArray }]

    res.locals.trip = output;
    // console.log('output ', output)
    return next()

  } catch (error) {

    return next(error)
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
      message: {
        err: 'tripController.getTripDetails - error getting user trip'
      }
    })
  }
}

tripController.addTrip = (req, res, next) => {
  try {
    // Add the trip data to the trips table, returning the tripid
    const userid = req.cookies.userid;
    const { title, city, brand, description, startDate, endDate, idea } = req.body;
    const valuesOne = [city, brand, description, startDate, endDate, idea];
    const queryOne =
      `INSERT INTO trips
      (city, brand, description, startdate, enddate, idea)
      VALUES 
      ($1, $2, $3, $4, $5, $6)
      RETURNING
      tripid`;

    db.query(queryOne, valuesOne)
      .then(data => {
        //add tripid to res.locals to return to front end
        res.locals.tripid = { tripid: data.rows[0].tripid};
        // Insert the tripid and userid to the joining table
        const valuesThree = [userid, data.rows[0].tripid];
        const queryThree = `
          INSERT INTO users_trips
          (userid, tripid)
          VALUES
          ($1, $2)`;
        db.query(queryThree, valuesThree)
          .then(finished => {
            return next();
          });
      });
  }
  catch (error) {
    return next({
      log: 'tripController.addTrip - error adding user trip: ' + error,
      status: 500,
      message: { err: 'tripController.addTrip - error adding user trip' }
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
      message: {
        err: 'tripController.deleteTrip - error deleting user trip'
      }
    })
  }
}

// Add additional user to trip
tripController.addUser = async (req, res, next) => {
  const email = req.body.email;
  const tripId = req.body.tripId;
  const emailQuery = `
    SELECT userId
    FROM users
    WHERE email = $1
    `;
  const emailValue = [email]
  const userData = await db.query(emailQuery, emailValue);
  console.log('User Data => ', userData);
  if (userData.rowCount) {
    const userId = userData.rows[0].userid;
    const tripInsert = `
      INSERT INTO users_trips
      (userId, tripId)
      VALUES
      ($1, $2)
      `;
    const tripValues = [userId, tripId];
    const insertData = db.query(tripInsert, tripValues);
    return next();
  } else {
    res.redirect(`/trip/sendInvite/${email}/${tripId}`);
  };
}

module.exports = tripController;