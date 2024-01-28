const express = require('express');

const tripController = require('../controllers/tripController');
const cookieController = require('../controllers/cookieController')

const router = express.Router();

//Route for adding trips
router.post('/addTrip', 
  tripController.addTrip, 
  (req, res) => {
    //send back added trip
    res.status(200).json(res.locals.addedTrip)
  }
);

//route for getting trips
router.get('/getTrips', tripController.getTrips, 
  (req, res) => {
    res.status(200).json(res.locals.trips)
  }
);

//route for editing trip details
router.patch('/editTrip', tripController.editTrip, (req, res) => {
  res.status(200).json(res.locals.trip)
});

//route for getting trip details
router.get('/getTripDetails',
// create a cookie with the tripId
  cookieController.setTripCookie,
  tripController.getTripDetails,
  (req, res) => {
    // console.log('in /getTripDetails ', res.locals.tripId);
    res.status(200).json(res.locals.trip)
  }
);

//route for deleting trips
router.delete('/deleteTrip', tripController.deleteTrip, 
  (req, res) => {
    res.status(200).json(res.locals.trip)
  }
);

module.exports = router;