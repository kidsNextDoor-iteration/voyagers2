const express = require("express");
const app = express();
const path = require('path');
const PORT = 3000;
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const proxy = require('express-http-proxy');

const internalRouter = require('./routes/internalRouter');
const tripRouter = require('./routes/tripRoute');
const imgAPiRouter = require('./routes/imgApiRoute');
const googleRouter = require('./routes/googleRouter')
const passkeyRouter = require('./routes/passkeyRouter')

const userController = require('./controllers/userController.js');
// const imageController = require('./controllers/imageController.js');
// const tripController = require('./controllers/tripController.js');
// const cookieController = require('./controllers/cookieController.js')


const multer = require('multer')
const storage = multer.memoryStorage()
const upload = multer({ storage: storage })



app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));

// app.use('/return', proxy('http://localhost:8080', {
//   proxyReqPathResolver: function (req) {
//     return req.url;
//   }
// }));




app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'));
});



// ------------- INTERNAL ROUTING ---------------- //
app.use('/internal', internalRouter);

// --------------- TRIP ROUTING ------------- //
app.use('/trip', tripRouter);

// --------------- IMG API ROUTING ------------- //
app.use('/api', imgAPiRouter);

// ------------- CLIENT ROUTING FOR REACT ROUTER -------------- //
app.get('/home', (req, res) => {
  console.log('reroute to dist 123')
  res.sendFile(path.join(__dirname, '../dist/index.html'))
});

app.get('/signin', (req, res) => {
  console.log('reroute to dist')
  res.sendFile(path.join(__dirname, '../dist/index.html'))
});

app.get('/signup', (req, res) => {
  console.log('reroute to dist')
  res.sendFile(path.join(__dirname, '../dist/index.html'))
});

app.get('/addtrip', userController.verifyAuth, (req, res) => {
  console.log('reroute to dist')
  res.sendFile(path.join(__dirname, '../dist/index.html'))
});

app.get('/imageDemo', (req, res) => {
  console.log('reroute to dist')
  res.sendFile(path.join(__dirname, '../dist/index.html'))
})



app.get('/trips', userController.verifyAuth, (req, res) => {
  console.log('reroute to distroy')
  res.sendFile(path.join(__dirname, '../dist/index.html'))
});

app.get('/moodboard', userController.verifyAuth, (req, res) => {
  console.log('reroute to dist')
  res.sendFile(path.join(__dirname, '../dist/index.html'))
});

app.get('/collaborations', userController.verifyAuth, (req, res) => {
  console.log('reroute to dist')
  res.sendFile(path.join(__dirname, '../dist/index.html'))
});


//--------------- OAUTH ROUTING -------------//

app.use('/google', googleRouter);
app.use('/facebook', facebookRouter);
app.use('/passkey', passkeyRouter)



//--------- CHECK COOKIE ---------//

app.get('/checkCookie', (req, res) => {
  const cookie = req.cookies.userid;
  console.log("cookie data: ", cookie);
  if (cookie) {
    res.status(200).json(true)
  } else {
    res.status(500).json(false)
  }

})





// global error handler
app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Error handler caught unknown middleware error',
    status: 500,
    message: { err: `An error occurred ${err}` },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message)
});

app.listen(PORT, () => {
  console.log(`Server listening on PORT ${PORT}`);
});

