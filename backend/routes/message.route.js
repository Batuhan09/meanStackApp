const express = require('express');
const { Query } = require('mongoose');
const app = express();
const messageRoute = express.Router();
// Message model
let Message = require('../models/Message');
const jwtHelper = require('../config/jwtHelper');
const ctrlMessage = require('../controllers/message.controller');
const ctrlLog = require('../controllers/log.controllers');
const ctrlUser = require('../controllers/user.controllers');

messageRoute.post('/',ctrlUser.userExists , jwtHelper.verifyJwtToken, ctrlMessage.addMessage, ctrlLog.addLog);

messageRoute.get('/inbox/:id',ctrlUser.userExists,jwtHelper.verifyJwtToken,ctrlMessage.getInbox, ctrlLog.addLog);

messageRoute.get('/outbox/:id',ctrlUser.userExists ,jwtHelper.verifyJwtToken, ctrlMessage.getOutbox, ctrlLog.addLog);

messageRoute.get('/:id',ctrlUser.userExists , jwtHelper.verifyJwtToken, ctrlMessage.getMessage, ctrlLog.addLog);

messageRoute.put('/:id',ctrlUser.userExists ,jwtHelper.verifyJwtToken, ctrlMessage.updateMessage, ctrlLog.addLog);

messageRoute.delete('/:id',ctrlUser.userExists ,jwtHelper.verifyJwtToken,ctrlMessage.deleteMessage, ctrlLog.addLog);


module.exports = messageRoute;