const cookieController = {};

cookieController.setTripCookie = (req, res, next) => {
  try{
    console.log('req query from cookie controller: ',req.query.tripId)
    res.locals.tripId = req.query.tripId;
    // res.cookie('tripId', req.query.tripId)
    return next()
  } catch (err) {
    console.log('error in cookieController.setTripCookie', err)
    return next();
  }
}




module.exports = cookieController;




