const express = require('express');
const app = express();
const UserRoute = express.Router();
const jwt = require('jsonwebtoken');
// User model
let User = require('../models/User');
const passport = require('passport');
const jwtHelper = require('../config/jwtHelper');

const ctrlUser = require('../controllers/user.controllers');
const ctrlLog = require('../controllers/log.controllers');


UserRoute.get('/:id',ctrlUser.userExists ,jwtHelper.verifyJwtToken, ctrlUser.getUser, ctrlLog.addLog)

UserRoute.post('/authenticate', ctrlUser.authenticate, ctrlLog.addLog);

UserRoute.put('/:id',ctrlUser.userExists , jwtHelper.verifyJwtToken, ctrlUser.updateUser, ctrlLog.addLog)

UserRoute.delete('/:id',ctrlUser.userExists ,ctrlUser.userExists,jwtHelper.verifyJwtToken,ctrlUser.deleteUser, ctrlLog.addLog);

UserRoute.get('/',ctrlUser.userExists ,jwtHelper.verifyJwtToken, ctrlUser.getAllUsers, ctrlLog.addLog);

UserRoute.post('/register', ctrlUser.register, ctrlLog.addLog);

UserRoute.post('/',ctrlUser.userExists ,jwtHelper.verifyJwtToken, ctrlUser.addUser, ctrlLog.addLog);


module.exports = UserRoute;