const express = require('express');
const authController = require('../controller/authController');
const userController = require('../controller/userController');
const passport = require('../config/passport');

const Router = express.Router();

Router.post('/signup', authController.signup);
Router.post('/login', authController.login);
Router.post('/logout', authController.logout);
Router.post('/forgot-password', authController.forgotPassword);
Router.patch('/reset-password/:token', authController.resetPassword);

Router.route('/').get(userController.getAllUsers);
Router.route('/get-user/:id').get(userController.getUser);
Router.route('/me').get(
  authController.protect,
  userController.getMe,
  userController.getUser,
);

//Oauth route
Router.get(
  '/google',
  passport.authenticate('google', {
    scope: ['profile', 'email'],
    session: false,
  }),
);
Router.get('/google/callback', authController.googleCallback);

module.exports = Router;
