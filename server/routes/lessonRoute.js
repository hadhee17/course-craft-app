const lessonController = require('../controller/lessonController');
const express = require('express');
const Router = express.Router();

Router.route('/lesson-by-id/:id').get(lessonController.getLessonById);

module.exports = Router;
