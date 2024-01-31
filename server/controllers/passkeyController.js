const Passage = require("@passageidentity/passage-node");
const db = require('../model.js');

const passageConfig = {
  appID: process.env.REACT_APP_PASSAGE_APP_ID,
  apiKey: process.env.PASSAGE_API_KEY,
};
let passage = new Passage(passageConfig);

const passkeyController = {};

passkeyController.auth = async (req, res, next) => {
  console.log('in passkeyController auth!')
  try {
    let userID = await passage.authenticateRequest(req);
    if (userID) {
      // user authenticated
      const { email, phone } = await passage.user.get(userID);
      console.log('userID.email:', email)
      res.locals.email = email;
      next();
    }
  } catch(e) {
      // failed to authenticate
      // we recommend returning a 401 or other "unauthorized" behavior
      console.log(e);
      res.status(401).send('Could not authenticate user!');
  }
}

passkeyController.storeUser = async (req, res, next) => {
  try {
    const existingUser = await db.query(`SELECT * FROM users WHERE email = '${res.locals.email}'`)
    if (existingUser.rows.length > 0) {
      await db.query(`UPDATE users SET passkey = true WHERE email = '${res.locals.email}'`);
    } else {
      let queryValues = ['Anonymous', 'User', res.locals.email, true];
      let queryText = 'INSERT INTO users (firstname, lastname, email, passkey) VALUES ($1, $2, $3, $4)';
      await db.query(queryText, queryValues);
    }

    const userid = await db.query(`SELECT userid FROM users WHERE email = '${res.locals.email}'`);
    console.log("userid: ", userid.rows[0].userid);
    res.locals.userid = userid.rows[0].userid;
    return next();
  } catch (err) {
    console.log('Error in passkeyController.storeUser:', err);
 }
};

module.exports = passkeyController