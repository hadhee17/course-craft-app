const userModel = require('../model/userModel');
const AppError = require('../utils/appError');
const jwt = require('jsonwebtoken');
const { promisify } = require('util');
const sendEmail = require('../utils/email');
const crypto = require('crypto');
const passport = require('../config/passport');

//oauth config
// --------------------- OAUTH LOGIN --------------------- //
exports.googleAuth = passport.authenticate('google', {
  scope: ['profile', 'email'],
});

exports.googleCallback = (req, res, next) => {
  passport.authenticate('google', { session: false }, async (err, user) => {
    if (err || !user) {
      console.error('OAuth error:', err);
      return res.redirect(
        'https://course-hub-app.vercel.app/login?error=oauth_failed',
      ); // optional query param
    }

    try {
      // Generate JWT
      const token = jwtToken(user._id);

      // Set cookie
      res.cookie('jwt', token, {
        httpOnly: true,
        secure: true,
        // secure: process.env.NODE_ENV === 'production',
        sameSite: 'none',
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });
      // Redirect with user info in query params
      const userQuery = encodeURIComponent(
        JSON.stringify({
          name: user.name,
          email: user.email,
        }),
      );

      return res.redirect(`https://course-hub-app.vercel.app/`); // front page
    } catch (error) {
      console.error('Post-login error:', error);
      return res.redirect(
        'https://course-hub-app.vercel.app/login?error=server_error',
      );
    }
  })(req, res, next);
};

////
const jwtToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRATION,
  });
};
exports.signup = async (req, res, next) => {
  try {
    const { name, email, password, passwordConfirm, role } = req.body;

    // ✅ Check if password and confirm exist
    if (!password || !passwordConfirm) {
      return next(
        new AppError('Please provide password and password confirm', 400),
      );
    }

    const newUser = await userModel.create({
      name,
      email,
      password,
      role,
      passwordConfirm,
    });

    const token = jwtToken(newUser._id);

    res.cookie('jwt', token, {
      httpOnly: true,
      secure: true,
      // secure: process.env.NODE_ENV === 'production',
      sameSite: 'none',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(201).json({
      status: 'Success',
      token,
      data: {
        user: newUser,
      },
    });
  } catch (error) {
    next(error);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return next(new AppError('Please provide login and password', 404));
    }

    const user = await userModel.findOne({ email }).select('+password');

    if (!user || !(await user.correctPassword(password, user.password))) {
      return next(new AppError('Invalid email or password', 401));
    }

    const token = jwtToken(user._id);

    res.cookie('jwt', token, {
      httpOnly: true,

      // secure: false,
      secure: true,
      sameSite: 'none',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    console.log('JWT cookie set:', res.getHeader('Set-Cookie'));

    res.status(200).json({
      status: 'Success',
      token,
      data: {
        user,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

exports.protect = async (req, res, next) => {
  try {
    let token;
    if (req.cookies && req.cookies.jwt) token = req.cookies.jwt;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      token = req.headers.authorization.split(' ')[1];
    }
    if (!token) {
      return next(new AppError('You are not logged in to get access', 401));
    }
    //verification
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
    //check user exist
    const currentUser = await userModel.findById(decoded.id);
    if (!currentUser) {
      return next(
        new AppError('The user belonging to token no longer exist', 401),
      );
    }
    console.log(decoded.iat);
    //check user changed password after token issue
    if (currentUser.changePassword(decoded.iat)) {
      return next(
        new AppError('User recently changed password.Please login again', 401),
      );
    }
    //making user available for next middleware..important
    req.user = currentUser;
  } catch (error) {
    next(error);
  }
  next();
};

exports.restrctTo = (...role) => {
  return (req, res, next) => {
    if (!role.includes(req.user.role)) {
      return next(
        new AppError('You do not have permission to perform this action', 403),
      );
    }
    next();
  };
};

exports.forgotPassword = async (req, res, next) => {
  //get user based on post request from postman
  const user = await userModel.findOne({ email: req.body.email });

  if (!user) {
    return next(new AppError('There is no user with email address', 404));
  }

  //generate randm reset token
  const resetToken = user.createPasswordResetToken();
  await user.save({ validateBeforeSave: false });

  //send to user email
  const resetURL = `${req.protocol}://${req.get('host')}/api/v1/resetPassword/${resetToken}`;

  const message = `Forgot your password? Submit a PATCH request with your new password and passwordConfirm to: ${resetURL}.\nIf you didn't forget your password, please ignore this email!`;
  console.log(resetToken);
  try {
    await sendEmail({
      email: user.email,
      subject: 'Your password reset Token (valid for 10 min)',
      text: message,
    });

    res.status(200).json({
      Status: 'Success',
      message: 'Token sent to email',
    });
  } catch (error) {
    user.passwordResetToken = undefined;
    user.passwordResetExpire = undefined;
    await user.save({ valideBeforeSave: false });

    return next(
      new AppError('there was an error sending email.Try again later!', 500),
    );
  }
};

exports.resetPassword = async (req, res, next) => {
  try {
    // 1) Get user based on the token
    const hashedToken = crypto
      .createHash('sha256')
      .update(req.params.token)
      .digest('hex');

    const user = await userModel.findOne({
      passwordResetToken: hashedToken,
      passwordResetExpire: { $gt: Date.now() },
    });

    // 2) If token has not expired, and there is user, set the new password
    if (!user) {
      return next(new AppError('Token is invalid or has expired', 400));
    }
    user.password = req.body.password;
    user.passwordConfirm = req.body.passwordConfirm;
    user.passwordResetToken = undefined;
    user.passwordResetExpire = undefined;
    await user.save();

    // 3) Log the user in, send JWT
    const token = jwtToken(user._id);
    res.status(200).json({
      status: 'success',
      token,
    });
  } catch (error) {
    next(error);
  }
};

exports.logout = (req, res) => {
  res.cookie('jwt', 'loggedout', {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  });
  res.status(200).json({ status: 'success' });
};
