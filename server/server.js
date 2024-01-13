const express = require("express");
const app = express();
const path = require('path');
const PORT = 3000;
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');



const userController = require('./controllers/userController.js');
const imageController = require('./controllers/imageController.js');


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
app.post('/signin', userController.verifyUser,
  // add middleware here,
  (req, res) => {
    res.status(200).send('request to signin successful')
  }
)
app.post('/signup', userController.addUser, 
  // add middleware here,
  (req, res) => {
    console.log('in /signup');
    res.status(200).send('request to signup successful')
  }
)


// --------------- IMAGE ROUTING --------------- //

app.post('/api/uploadimage',
upload.single('image'),
  imageController.uploadSingleImg,
  (req, res) => {
    res.status(200).send({})
  }
)


// ------------------ GET IMAGE ------------------- //
app.get('/api/getImages', 
  imageController.getImages,
  (req, res) => {
    res.status(200).json(res.locals.imageQueryResults)
  }
)


// ----------- DB ROUTING ------------------- //



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





app.listen(PORT, () => {
    console.log(`Server listening on PORT ${PORT}`);
});

