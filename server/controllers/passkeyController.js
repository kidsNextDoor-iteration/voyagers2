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
      const test = await passage.user.get(userID);
      console.log('userID:', test)
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
  return next();
};

// example of passage middleware

// let passageAuthMiddleware = (() => {
//     return async (req, res, next) => {
//         try {
//             let userID = await passage.authenticateRequest(req);
//             if (userID) {
//               // user authenticated
//               const { email, phone } = await passage.user.get(userID);
//               res.locals.userid = email;
//               next();
//             }
//         } catch(e) {
//             // failed to authenticate
//             // we recommend returning a 401 or other "unauthorized" behavior
//             console.log(e);
//             res.status(401).send('Could not authenticate user!');
//         }
//     }
// })();

module.exports = passkeyController