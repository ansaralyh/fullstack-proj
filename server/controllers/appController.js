//  const UserModel = require("../model/User.model.js")

const UserModel = require("../model/User.model.js");
const jwt = require('jsonwebtoken')
const ENV = require('../config.js')
const bcrypt = require("bcrypt")
const otpGenerator = require('otp-generator')



//  middleware to vaerify user

exports.verifyUser = async (req, res, next) => {
  try {
    const { username } = req.method == "GET" ? req.query : req.body;
    console.log(username)

    // check user existance
    let exist = await UserModel.findOne({ username });
    console.log(exist)
    if (!exist) return res.status(404).send({ error: "can't find user" })
    next();

  } catch (error) {
    console.log(error)
    return res.status(404).send({ error: 'Authentication Error' })

  }

}

exports.register = async (req, res) => {
  try {
    console.log('Api is working fine')
    const { username, password, profile, email } = req.body;
    const existUsername = await UserModel.findOne({ username })
    const existEmail = await UserModel.findOne({ email })
    if (existEmail) {
      res.status(409).json({
        success: false,
        message: "User with this email already exists"
      })
    } else if (existUsername) {
      res.status(409).json({
        success: false,
        message: "User with this username already exists"
      })
    } else {
      const hashedPass = await bcrypt.hash(password, 10)
      const user = await UserModel.create({ username, password: hashedPass, email, profile })

      res.status(200).json({
        success: true,
        user
      })
    }
  } catch (error) {

    return res.status(500).send(error);
  }
}
//  login
exports.login = async function (req, res) {
  const { username, password } = req.body;

  const user = await UserModel.find()

  try {
    UserModel.findOne({ username })
      .then(user => {
        if (!user)
          return res.status(404).send({ error: "User not found" });

        bcrypt.compare(password, user.password)
          .then(passwordCheck => {

            if (!passwordCheck)
              return res.status(400).send({ error: "Password does not match" });

            // JWT token
            const token = jwt.sign(
              {
                userId: user._id,
                username: user.username
              },
              ENV.JWT_SECRET,
              { expiresIn: '24h' }
            );
            return res.status(200).send({
              msg: 'Login Successfull...!',
              username: user.username,
              token
            })
          })
          .catch(error => {
            return res.status(400).send({ error: "Password does not match" });
          });
      })
      .catch(error => {
        return res.status(404).send({ error: "User not found" });
      });

  } catch (error) {
    console.log(error)
    return res.status(500).send({ error });
  }
};

//  get user
exports.getUser = async function (req, res) {
  const { username } = req.params;

  try {
    if (!username) {
      return res.status(400).send({ error: "Invalid username" });
    }
    const user = await UserModel.findOne({ username });

    if (!user) {
      return res.status(404).send({ error: "Could not find user" });
    }
    // remove password from user
    // mongoose return unnessary data with objecct so convert it to json
    const { password, ...rest } = Object.assign({}, user.toJSON());
    return res.status(200).send(rest);

  } catch (error) {
    return res.status(500).send({ error: "Internal Server Error" });
  }
};


// update user


exports.updateUser = async function (req, res) {
  try {
    const id = req.query.id;
    if (!id) {
      return res.status(401).send({ error: "User ID not provided" });
    }

    const body = req.body;
    // Update the user using async/await and promise-based updateOne()
    const updateResult = await UserModel.updateOne({ _id: id }, body);

    if (updateResult.n === 0) {
      return res.status(404).send({ error: "User not found" });
    }

    return res.status(201).send({ msg: "Record updated successfully" });
  } catch (error) {
    return res.status(500).send({ error: "Error updating user" });
  }
};

// GENERATE otp

exports.generateOTP = async function (req, res) {
  req.app.locals.OTP = await otpGenerator.generate(6, {
    lowerCaseAlphabets: false,
    upperCaseAlphabets: false, specialChars: false
  })
  res.status(201).send({ code: req.app.locals.OTP })

}

// verify otp
exports.verifyOTP = async function (req, res) {
  const { code } = req.query;

  if (parseInt(req.app.locals.OTP) === parseInt(code)) {
    req.app.locals.OTP = null; // Reset the value of OTP
    req.app.locals.resetSession = true; // Start session for password reset
    res.status(201).send({ msg: 'Verification successfull' });
  } else {
    res.status(400).send({ error: 'Invalid OTP' });
  }
};


// successfully redirect user when OTPis valid
// create reset
exports.createResetSession = async function (req, res) {
  if (req.app.locals.resetSession) {
    req.app.locals.resetSession = false; // allow access to thid route only once
    return res.status(201).send({ msg: "access grant" })
  }

  return res.status(440).send({ error: "Session expired" })
}



//  reset password
exports.resetPassword = async function (req, res) {
  try {

    if (!req.app.locals.resetSession) return res.status(440).send({ error: "Session expired!" });

    const { username, password } = req.body;

      const exists = await UserModel.findOne({username})
      if(exists){
        const hashedPass = await bcrypt.hash(password,10);
        await UserModel.updateOne({ username: exists.username },
          { password: hashedPass });

          res.status(200).send('Record updated')
      }else{
        res.status(404).send('User not found')
      }

  } catch (error) {
    return res.status(401).send({ error })
  }
}

