const courseController = require('../controller/courseController');
const express = require('express');
const Router = express.Router();
const authController = require('../controller/authController');
const upload = require('../middleware/multer');

Router.route('/basic-course-data').get(
  courseController.aliasData,
  courseController.getAllCourse,
);

Router.route('/top-rated').get(courseController.getTopRated);
Router.route('/all-course').get(courseController.getAllCourse);

Router.route('/create-course').post(
  upload.single('image'),
  courseController.createCourse,
);

Router.route('/update-course/:id').patch(
  upload.single('image'),
  courseController.updateCourse,
);

Router.route('/delete-course/:id').delete(
  authController.protect,
  authController.restrctTo('admin', 'lead-guide'),
  courseController.deleteCourse,
);

Router.route('/course-id/:id').get(courseController.getCourseById);

module.exports = Router;
