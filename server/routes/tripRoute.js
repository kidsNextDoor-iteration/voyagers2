const express = require('express');

const tripController = require('../controllers/tripController');
const cookieController = require('../controllers/cookieController');
const userController = require('../controllers/userController');
const imageController = require('../controllers/imageController');


const router = express.Router();

//Route for adding trips
router.post('/addTrip',
  tripController.addTrip,
  (req, res) => {
    res.status(200).send('Trip added!')
  }
);

//route for getting trips
router.get('/getTrips',
  tripController.getTrips,
  imageController.getCoverImage,
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
  tripController.getCompanions,
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

router.post('/addTraveler', tripController.addUser,
  (req, res) => res.status(200).json('Traveler Added')
);

router.get('/sendInvite/:email/:tripid', userController.email,
  (req, res) => res.status(200).json('Invite Sent')
);

module.exports = router;