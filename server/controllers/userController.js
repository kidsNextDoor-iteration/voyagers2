const db = require('../model.js');
const bcrypt = require('bcrypt')
const nodemailer = require('nodemailer')
require('dotenv').config();

const transporter = nodemailer.createTransport({
  host: "smtp.fastmail.com",
  port: 465,
  secure: true,
  auth: {

    user: process.env.NODEMAILER_EMAIL,
    pass: process.env.NODEMAILER_PASSWORD
  },
});


const userController = {};

// controller to add a new user to database

userController.email = async (req, res, next) => {
  try {
    const email = req.params.email;
    const tripid = req.params.tripid;

    console.log('params: ', email, tripid)

    const url = 'http://localhost:8080/'

    const info = await transporter.sendMail({
      from: '"Voyagers" <voyagers2@fastmail.com>', // sender address
      to: email, // list of receivers
      subject: "You've Been Invited to Join a Trip!", // Subject line
      text: "Hello world?", // plain text body
      html: ` <h2>Hello!</h2></b><h3>You've been invited by another user to join them on a dream vacation.</h3><br><h2><a href =${url}>Create Account and Join Now!</a></h2>`
    });



    return next();

  } catch (error) {
    return next(error)
  }



}
userController.addUser = async (req, res, next) => {
  if (!req.body.firstname || !req.body.lastname || !req.body.email || !req.body.password) {
    console.log(req.body)
    return res.status(400).json({ err: "Please fill in all empty fields" });
  }
  const checkEmailQuery = `
    SELECT email FROM users WHERE email = $1
  `
  db.query(checkEmailQuery, [req.body.email])
    .then(async data => {
      if (data.rows[0] !== undefined) {
        return res.status(400).json({ err: "Email already exists" })
      } else {
        const hash = await bcrypt.hash(req.body.password, 10)
        const values = [req.body.firstname, req.body.lastname, req.body.email, hash];
        const newUserQuery = `
          INSERT INTO users (firstname, lastname, email, password) 
          VALUES ($1, $2, $3, $4)
          RETURNING userid;
        `
        db.query(newUserQuery, values)
          .then(data => {
            res.locals.userid = data.rows[0].userid;
            return next();
          })
          .catch(err => {
            return next({
              log: 'userController.addUser - error creating user',
              status: 500,
              message: { err: 'userController.addUser - error creating user' },
            });
          })
      }
    })
    .catch(err => {
      return next({
        log: 'userController.addUser - error creating user',
        status: 500,
        message: { err: 'userController.addUser - error creating user' },
      })
    })
}

// verify user
userController.verifyUser = (req, res, next) => {


  //serach for type in database based on email


  const loginQuery = `
    SELECT email, password, userid FROM users WHERE email = $1;
    
  `
  db.query(loginQuery, [req.body.email])
    .then(async data => {
      const result = await bcrypt.compare(req.body.password, data.rows[0].password);
      console.log('VerifyUser data: \n' + data.rows)
      res.locals.userid = data.rows[0].userid;
      if (result) return next();
      else throw new Error()
    })
    .catch(err => {
      return next({
        log: 'userController.verifyUser - error verifying user',
        status: 500,
        message: { err: 'userController.verifyUser - error verifying user' },
      })
    });
}

userController.userCookie = (req, res, next) => {
  res.cookie('userid', res.locals.userid, { httpOnly: true, maxAge: 86400000 })
  console.log('userCookie userID: \n' + res.locals.userid)
  console.log('userId cookie created')
  return next();
}

//only being called from /trips
userController.verifyAuth = (req, res, next) => {
  try {
    if (req.cookies.userid) {
      console.log('in trips, passed cookie check')
      return next();
    }
    else { return res.redirect('/home') };
  }
  catch (error) {
    return next({
      log: 'userController.verifyAuth - issue verifing auth to access page, err:\n ' + error,
      status: 500,
      message: {
        err: 'userController.verifyAuth - issue verifing auth to access page'
      }
    })
  }
}

userController.signout = (req, res, next) => {
  try {
    res.clearCookie('userid');
    return next();
  }
  catch (error) {
    return next({
      log: 'userController.signout - issue signing user out, err:\n ' + error,
      status: 500,
      message: {
        err: 'userController.signout - issue signing user out'
      }
    })
  }
}


module.exports = userController;
