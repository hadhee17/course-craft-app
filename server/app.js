const express = require('express');
const courseRouter = require('./routes/courseRoutes');
const moduleRouter = require('./routes/moduleRoutes');
const lessonRouter = require('./routes/lessonRoute');

const userRouter = require('./routes/userRoute');
const errorController = require('./controller/errorController');
const AppError = require('./utils/appError');
const cors = require('cors');
const passport = require('./config/passport');
const session = require('express-session');
const authRoutes = require('./routes/userRoute');

const app = express();

app.use(express.json());

//cors config
const allowedOrigins = [
  'http://localhost:5173', // local Vite dev server
  // deployed frontend
];
app.use(
  cors({
    origin: allowedOrigins, // allow your frontend
    credentials: true,
  }),
);

app.use(passport.initialize());

//course router
app.use('/api/v1/course', courseRouter);

//module router
app.use('/api/v1/course', moduleRouter);

//lesson router
app.use('/api/v1/course', lessonRouter);

//user route
app.use('/api/v1/users', userRouter);

app.all('/*catchall', (req, res, next) => {
  next(new AppError(`cant find ${req.originalUrl} on the server`, 404));
});

app.use(errorController);

module.exports = app;
