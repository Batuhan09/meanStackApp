const mongoose = require('mongoose');
const passport = require('passport');
const _ = require('lodash');
const requestIp = require('request-ip');
const User = mongoose.model('User');
const Log = mongoose.model('Log');


module.exports.addLog = (req, res, next) => {
    var log = new Log();
    if(req.body.actionType=="LOGOUT"){
      log.userId = req.body.userId;
      log.userName = req.body.userName;
      log.actionType = req.body.actionType;
      log.dataType = req.body.dataType;
      log.status = req.body.status;
      log.ip = requestIp.getClientIp(req);
      log.browser = req.headers['user-agent'];
      var currentdate = new Date(); 
      log.time = currentdate;
    }
    else if(req.register){
      log.userName = req.body.userName;
      log.actionType = "SIGNUP";
      log.dataType = "user";
      log.ip = requestIp.getClientIp(req);
      var currentdate = new Date(); 
      log.time = currentdate;
      log.status = req.myStatus;
    }
    else if(req.authenticate){
      log.userName = req.body.userName;
      log.actionType = "LOGIN";
      log.dataType = "user";
      log.ip = requestIp.getClientIp(req);
      log.browser = req.headers['user-agent'];
      var currentdate = new Date(); 
      log.time = currentdate;
      log.status = req.myStatus;
    }else{
      var user = this.getUserPayload(req.headers['authorization']);
      log.userId = user._id;
      log.userName = user.userName;
      log.actionType = req.method;
      log.dataType = req.originalUrl.split('/').join('?').split('?')[2];
      log.ip = requestIp.getClientIp(req); 
      log.browser = req.headers['user-agent'];
      var currentdate = new Date(); 
      log.time = currentdate;
      log.status = req.myStatus;
    }
    Log.create(log, (error, data) => {
      if (error) {
        console.log(error);
      } else {
        console.log("=========")
      }
    })
}

module.exports.getAllLogs = async (req, res, next) => {
  var user = this.getUserPayload(req.headers['authorization']);
  if(user.role == "admin"){
    try {
      let {page, size, sort} = req.query;
      console.log(req.query);
      if(!page){
        Log.find((error,data)=>{
          if(error){
            console.log(error);
          }else{
              res.json(data);
          }
      })
      }
      else{
        if(!size){size = 10;}
        const limit = parseInt(size);
        const skip = (page-1)*size;
        const logs = await Log.find().sort(sort).limit(limit).skip(skip);          
        console.log("SORT",sort)
        res.send(logs);
      }
  } catch (error) {
      res.sendStatus(500).send(error.message);
  }
  }else{
    res.send("permisssion denied")
  }
}

module.exports.getUserPayload = (auth) => {
  console.log("payload",auth.split(" ")[1].split(".")[1])
  if (auth.split(" ")[1].split(".")[1]) {
    var userPayload = atob(auth.split(" ")[1].split(".")[1]);
    var user = JSON.parse(userPayload);
    return user;
  }
  else
    return null;
}
