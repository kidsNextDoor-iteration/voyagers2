const db = require('../model.js');
const bcrypt = require('bcrypt')

const userController = {};

// controller to add a new user to database
userController.addUser = async (req, res, next) => {
  // add bcrypt hashing
  const hash = await bcrypt.hash(req.body.password, 10)
  const values = [req.body.firstName, req.body.lastName, req.body.email, hash];
  const newUserQuery = `
    INSERT INTO users (firstName, lastName, email, password)
    VALUES ($1, $2, $3, $4)
    `
  try {
    db.query(newUserQuery, values);
    return next();
  }
  catch(err) {
    return next({
        log: 'userController.addUser - error creating user',
        status: 500,
        message: { err: 'userController.addUser - error creating user'},
    });
  }
}

// verify user
userController.verifyUser = (req, res, next) => {
  const loginQuery = `
    SELECT email, password FROM users WHERE email = $1
  `
  db.query(loginQuery, [req.body.email])
    .then(async data => {
      const result = await bcrypt.compare(req.body.password, data.rows[0].password);
      if (result) return next();
      else throw new Error()
    })
    .catch(err => {
      return next({
        log: 'userController.verifyUser - error verifying user',
        status: 500,
        message: { err: 'userController.verifyUser - error verifying user'},
    })
  });
}


module.exports = userController;