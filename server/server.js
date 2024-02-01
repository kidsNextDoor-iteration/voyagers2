const express = require("express");
const app = express();
const path = require('path');
const PORT = 3000;
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
// const proxy = require('express-http-proxy');

const internalRouter = require('./routes/internalRouter');
const tripRouter = require('./routes/tripRoute');
const imgAPiRouter = require('./routes/imgApiRoute');
const googleRouter = require('./routes/googleRouter')
const passkeyRouter = require('./routes/passkeyRouter')
const userController = require('./controllers/userController.js');

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

//was being called from redirect in internalRouter.js (not anymore). 
//Still being called from userController.js, which calls it from userController.verifyAuth, which is only called in get '/trips' in server.js
app.get('/home', (req, res) => {
  console.log('/home called')
  console.log('reroute to dist')
  res.sendFile(path.join(__dirname, '../dist/index.html'))
});

//was only being called from redirect in internalRouter.js. not anymore
// app.get('/signin', (req, res) => {
//   console.log('/signin called')
//   console.log('reroute to dist')
//   res.sendFile(path.join(__dirname, '../dist/index.html'))
// });

//only being called in Login.jsx. Login component is never actually used in the app
// app.get('/signup', (req, res) => {
//   console.log('/signup called')
//   console.log('reroute to dist')
//   res.sendFile(path.join(__dirname, '../dist/index.html'))
// });

//this route is never being called
// app.get('/addtrip', userController.verifyAuth, (req, res) => {
//   console.log('reroute to dist')
//   res.sendFile(path.join(__dirname, '../dist/index.html'))
// });

//this route is never being called
// app.get('/imageDemo', (req, res) => {
//   console.log('reroute to dist')
//   res.sendFile(path.join(__dirname, '../dist/index.html'))
// })

//being called from: Header.jsx, redirect in googleRouter.js, redirect in internalRouter.js, passkeyRouter.js
app.get('/trips', userController.verifyAuth, (req, res) => {
  console.log('/trips called')
  console.log('reroute to dist')
  res.sendFile(path.join(__dirname, '../dist/index.html'))
});

//this route is never being called
// app.get('/moodboard', userController.verifyAuth, (req, res) => {
//   console.log('reroute to dist')
//   res.sendFile(path.join(__dirname, '../dist/index.html'))
// });

//this route is never being called
// app.get('/collaborations', userController.verifyAuth, (req, res) => {
//   console.log('reroute to dist')
//   res.sendFile(path.join(__dirname, '../dist/index.html'))
// });


//--------------- OAUTH ROUTING -------------//

app.use('/google', googleRouter)
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

