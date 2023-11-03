const express = require('express');
const router = express.Router();
// import all controlelrs
const controller = require('../controllers/appController.js')
const Auth = require('../middleware/auth.js');
const { registerMail } = require('../controllers/mailer.js')
const { localVariables } = require('../middleware/auth.js');

// ** POST Methods
const {getUser} = require('../controllers/appController.js') 
router.route('/register').post(controller.register); // register user
router.route('/registerMail').post(registerMail); //send the mail
router.route('/authenticate').post(controller.verifyUser,(req,res)=>res.end()); // to authenticate the user
router.route('/login').post( controller.login); // login the app


// ** GET methodsa
router.route('/user/:username').get(controller.getUser); // user with username
router.route('/generateOTP').get(controller.verifyUser, localVariables, controller.generateOTP)

 
router.route('/verifyOTP').get(controller.verifyUser, controller.verifyOTP) // verify generated OTac
router.route('/createResetSession').get(controller.createResetSession); // reset all the variables

// ** PUT methods
router.route('/updateuser').put( (req, res) => {
    controller.updateUser(req, res);
  });
  
 // used to update the user profile
 router.route('/resetPassword').put(controller.verifyUser, controller.resetPassword); // use tp reset password

module.exports = router;
