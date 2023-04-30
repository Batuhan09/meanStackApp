const mongoose = require('mongoose');
const passport = require('passport');
const _ = require('lodash');

const User = mongoose.model('User');
const Log = mongoose.model('Log');
const ctrlLog = require('./log.controllers');





module.exports.userExists = (req, res, next) => {
  var user = ctrlLog.getUserPayload(req.headers['authorization']);
  User.findOne({ _id: user._id },
    (err, user) => {
      if (!user) {
        res.status(404).json({ status: false, message: 'User record not found.' });
        req.userNotExists = true;
        console.log("USER NOT FOUND")
      }
      else {
        req.userNotExists = false;
        next();
      }
    }
  );
}

module.exports.getAllUsers = async (req, res, next) => {
  //var user = ctrlLog.getUserPayload(req.headers['authorization'])
  //if (user.role == "admin") {
    try {
      let page, size;
      let noPage = false
      let queryObj = {};
      if(req.query['page']){ page = req.query['page']} else noPage = true;
      if(req.query['size']){ size = req.query['size']} else size = 10;      
      if (noPage) {
        User.find((error, data) => {
          if (error) {
            console.log(error);
            req.myStatus = String(error);
            next();
          } else {
            var users = [];
            for (let i = 0; i < data.length; i++) {
              var user = {}
              user._id = data[i]._id;
              user.userName = data[i].userName;
              user.nameAndSurname = data[i].nameAndSurname;
              user.email = data[i].email;
              user.role = data[i].role;
              user.gender = data[i].gender;
              user.birthdate = data[i].birthdate;
              users.push(user);
            }
            res.json(users);
            req.myStatus = "OK";
            next();
          }
        })
      }
      else {
        const limit = parseInt(size);
        const skip = (page - 1) * size;
        const data = await User.find().limit(limit).skip(skip);
        var users = []
        for (let i = 0; i < data.length; i++) {
          var user = {}
          user._id = data[i]._id;
          user.userName = data[i].userName;
          user.nameAndSurname = data[i].nameAndSurname;
          user.email = data[i].email;
          user.role = data[i].role;
          user.gender = data[i].gender;
          user.birthdate = data[i].birthdate;
          users.push(user);
        }
        console.log("users",users)
        res.send(users);
        req.myStatus = "OK";
        next();
      }
    } catch (error) {
      res.sendStatus(500).send(error.message);
      req.myStatus = String(error);
      next();
    }
  //} else {
  //  res.send("permission denied")
  //}
}
module.exports.deleteUser = (req, res, next) => {
  var user = ctrlLog.getUserPayload(req.headers['authorization'])
  if (user.role == "admin") {
    User.findByIdAndDelete(req.params.id, (error, data) => {
      if (error) {
        console.log(error);
        req.myStatus = String(error);
        next();
      } else {
        res.status(200).json({ status: true, data: _.pick(data, ['userName', 'nameAndSurname', 'email', 'gender', 'role']) });
        next();
      }
    })
  } else {
    res.send("permission denied")
  }

}

module.exports.addUser = (req, res, next) => {
  var user = ctrlLog.getUserPayload(req.headers["authorization"]);
  if (user.role == "admin") {
    User.create(req.body, (error, data) => {
      if (error) {
        req.myStatus = error;//to pass the next handler
        next()
      } else {
        req.myStatus = "OK";//to pass the next handler
        res.status(200).json({ status: true, data: _.pick(data, ['userName', 'nameAndSurname', 'email', 'gender', 'role']) });
        next()
      }
    })
  } else {
    res.send("permission denied")
  }
}

module.exports.updateUser = (req, res, next) => {
  var user = ctrlLog.getUserPayload(req.headers['authorization'])
  if (user.role == "admin") {
    User.findByIdAndUpdate(req.params.id, {
      $set: req.body
    }, (error, data) => {
      if (error) {
        req.myStatus = error;
        console.log(error)
        next();
      } else {
        res.json(req.body)
        console.log('Data updated successfully')
        req.myStatus = "OK";
        next();
      }
    })
  } else {
    res.send("permission denied")
  }
}

module.exports.authenticate = (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    req.authenticate = true;
    if (err) {
      res.status(400).json(err);
      req.myStatus = String(err);
      next();
    }
    else if (user) {
      res.status(200).json({ "token": user.generateJwt() });
      req.myStatus = "OK";
      next();
    }
    else {
      res.status(404).json(info);
      req.myStatus = info;
      next();
    }
  })(req, res);
}



module.exports.register = (req, res, next) => {
  req.register = true;
  var user = new User();
  user.userName = req.body.userName;
  user.nameAndSurname = req.body.nameAndSurname;
  user.email = req.body.email;
  user.password = req.body.password;
  user.role = req.body.role;
  user.gender = req.body.gender;
  user.birthdate = req.body.birthdate;
  user.save((err, data) => {
    if (!err) {
      res.status(200).json({ status: true, data: _.pick(data, ['userName', 'nameAndSurname', 'email', 'gender', 'role']) });
      req.myStatus = "OK";
      next();
    }
    else {
      if (err.code == 11000) {
        res.status(422).send(['Duplicate email adrress found.']);
        req.myStatus = "Duplicate E-mail";
        next();
      }
      else {
        console.log(err);
        req.myStatus = String(err);
        next();
      }
    }

  });
}

module.exports.getUser = (req, res, next) => {
  var user = ctrlLog.getUserPayload(req.headers['authorization'])
  if (user.role == "admin") {
    User.findById(req.params.id, (error, data) => {
      if (error) {
        req.myStatus = String(error);
        next();
      } else {
        res.status(200).json(_.pick(data, ['userName', 'nameAndSurname', 'email', 'birthdate','gender', 'role']));
        req.myStatus = "OK";
        next();
      }
    })
  } else {
    res.send("permission denied")
  }
}