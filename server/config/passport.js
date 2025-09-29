const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../model/userModel');
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL:
        'https://course-hub-app-backend.vercel.app/api/v1/users/google/callback',
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        console.log('Google profile received:', profile); // ✅ log profile info

        // Find or create user in DB
        let user = await User.findOne({ googleId: profile.id });

        if (!user) {
          user = await User.findOne({ email: profile.emails[0].value });

          if (user) {
            // Existing email found, link Google ID
            user.googleId = profile.id;
            await user.save();
          } else {
            // No user with this email → create new
            user = await User.create({
              name: profile.displayName,
              email: profile.emails[0].value,
              googleId: profile.id,
              password: 'google-oauth',
            });
          }
        }

        done(null, user);
      } catch (err) {
        console.error('Error in GoogleStrategy:', err); // ✅ log strategy errors
        done(err, null);
      }
    },
  ),
);

module.exports = passport;
