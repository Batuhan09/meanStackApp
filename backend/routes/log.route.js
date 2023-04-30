const express = require('express');
const app = express();
const logRoute = express.Router();
const jwtHelper = require('../config/jwtHelper');

const ctrlLog = require('../controllers/log.controllers');
const ctrlUser = require('../controllers/user.controllers');

logRoute.post('/', ctrlLog.addLog);
logRoute.get('/' ,ctrlUser.userExists, jwtHelper.verifyJwtToken, ctrlLog.getAllLogs);

  module.exports = logRoute;