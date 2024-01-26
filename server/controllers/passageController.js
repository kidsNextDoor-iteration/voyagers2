require('dotenv').config();
const Passage = require("@passageidentity/passage-node");

const passageConfig = {
  appID: process.env.REACT_APP_PASSAGE_APP_ID
};

// // example of passage middleware
// let passage = new psg(passageConfig);

// const user = passage.getCurrentUser();
// let test = async () => {
//   const userInfo = await user.userInfo();
//   console.log('userInfo: ', userInfo);
// };

const passageController = {}

passageController.verifyUser = (() => {
    return async (req, res, next) => {
        try {
            let userID = await passage.authenticateRequest(req);
            if (userID) {
              // user authenticated
              res.userID = userID;
              next();
            }
        } catch(e) {
            // failed to authenticate
            // we recommend returning a 401 or other "unauthorized" behavior
            console.log(e);
            res.status(401).send('Could not authenticate user!');
        }
    }
})();

module.exports = passageController;


