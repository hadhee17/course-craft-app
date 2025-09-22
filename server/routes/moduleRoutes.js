const moduleController = require('../controller/moduleController');
const express = require('express');
const Router = express.Router();

Router.route('/module').get(moduleController.getAllModule);
Router.route('/module/:id').get(moduleController.getModuleById);
module.exports = Router;
