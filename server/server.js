const express = require("express");
const app = express();
const path = require('path');
const PORT = 3000;
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');



const userController = require('./controllers/userController.js');
const imageController = require('./controllers/imageController.js');
const tripController = require('./controllers/tripController.js')


const multer = require('multer')
const storage = multer.memoryStorage()
const upload = multer({ storage: storage })



app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));




app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'));
});



// ------------- INTERNAL ROUTING ---------------- //
app.post('/signin', userController.verifyUser, userController.userCookie,
  // add middleware here,
  (req, res) => {
    res.redirect('/trips')
  }
)
app.post('/signup', userController.addUser, userController.userCookie,
  // add middleware here,
  (req, res) => {
    res.redirect('/trips')
  }
)
app.post('/addTrip', tripController.addTrip, 
  // add middleware here,
  (req, res) => {
    res.status(200).send('Trip added!')
  }
)

// ----------- DB ROUTING ------------------- //

// --------------- IMG API ROUTING ------------- //
app.get('/api/getImages', 
  imageController.getImages,
  (req, res) => {
    res.status(200).json(res.locals.imageQueryResults)
  }
)

app.post('/api/uploadimage',
  upload.single('image'),
  imageController.uploadSingleImg,
  (req, res) => {
    res.status(200).send({status: 'upload complete'})
  }
)

app.delete('/api/deleteImage',
  imageController.deleteImage,
  (req, res) => {
    res.status(200).json({status: 'delete complete'})
  }
)

// ------------- CLIENT ROUTING FOR REACT ROUTER -------------- //
app.get('/home', (req, res) => {
  console.log('reroute to dist')
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

app.get('/addtrip', (req, res) => {
  console.log('reroute to dist')
  res.sendFile(path.join(__dirname, '../dist/index.html'))
});

app.get('/imageDemo', (req, res) => {
  console.log('reroute to dist')
  res.sendFile(path.join(__dirname, '../dist/index.html'))
})



app.get('/trips', (req, res) => {
  console.log('reroute to dist')
  res.sendFile(path.join(__dirname, '../dist/index.html'))
});

app.get('/moodboard', (req, res) => {
  console.log('reroute to dist')
  res.sendFile(path.join(__dirname, '../dist/index.html'))
});

app.get('/collaborations', (req, res) => {
  console.log('reroute to dist')
  res.sendFile(path.join(__dirname, '../dist/index.html'))
});

// global error handler
app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Error handler caught unknown middleware error',
    status: 500,
    message: {err:`An error occurred ${err}`},
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message)
});

app.listen(PORT, () => {
    console.log(`Server listening on PORT ${PORT}`);
});

