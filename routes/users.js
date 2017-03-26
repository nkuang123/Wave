const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');
const User = require('../models/user');

// Register
router.post('/register', (req, res, next) => {

	let newUser = new User({

		firstname: req.body.firstname,
		lastname: req.body.lastname,
		email: req.body.email,
		username: req.body.username,
		password: req.body.password

	});

	User.getUserByUsername(newUser.username, (err, user) => {
		console.log('getUserByUsername');
		if (err) throw err;
		if (user) {

			return res.json({success: false, msg: 'Username Already Exists'});

		} else {

				User.addUser(newUser, (err, user) => {

					if(err) {

						return res.json({success: false, msg: 'Please enter a valid username'});

					} else {

						return res.json({success: true, msg: 'User registered'});

					}

				})

			}

		});

	});





// Validate
router.post('/validate', (req, res, next) => {
  const username = req.body.username;
  User.getUserByUsername(username, (err, userDB) => {
    if(err) throw err;
    if(userDB) {
      return res.json({success: false, msg: 'Username Already Exists'});
    } else {
      return res.json({success: true, msg: 'Username is unique'});
    }
  });
});

// Authenticate
router.post('/authenticate', (req, res, next) => {

	const username = req.body.username;
	const password = req.body.password;

	User.getUserByUsername(username, (err, user) => {

		if(err) throw err;

		if(!user) {

			return res.json({success: false, msg: 'User not found'});

		}

		User.comparePassword(password, user.password, (err, isMatch) => {
			if(err) throw err;
			if(isMatch) {
				const token = jwt.sign(user, config.secret, {
					expiresIn: 604800 // 1 week worth of seconds
				});

				res.json({
					success: true,
					token: 'JWT ' + token,
					user: {
						id: user._id,
						firstname: user.firstname,
						lastname: user.lastname,
						username: user.username,
						email: user.email

					}
				});
			} else {
				return res.json({success: false, msg: 'Wrong password'});
			}
		});

	});

});


// Profile
router.get('/profile', passport.authenticate('jwt', {session: false}), (req, res, next) => {

	res.json({user: req.user});

});


module.exports = router;
