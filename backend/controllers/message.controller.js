const mongoose = require('mongoose');
const passport = require('passport');
const _ = require('lodash');
const Message = mongoose.model('Message');
const ctrlLog = require("./log.controllers");



module.exports.addMessage = (req, res, next) => {
    Message.create(req.body, (error, data) => {
        if (error) {
          console.log(error);
          req.myStatus = String(error);
          next();
        } else {
          res.status(200).json({ status: true, data: _.pick(data, ['deletedbyFrom', 'deletedbyTo', 'content', 'createdAt', 'from', 'fromName', 'title', 'to', 'toName', 'trashByFrom', 'trashByTo']) });

          req.myStatus = "OK";
          next();
        }
      })
}

module.exports.getInbox = (req, res, next) => {
    let page, size;
    let queryObj = {};
    if(req.query['page']){ page = req.query['page']} else page = 1;
    if(req.query['size']){ size = req.query['size']} else size = 5;
    if(req.query['sort']){ sort = req.query['sort']} else sort = 'createdAt';
    if(req.query['trashByTo']){ queryObj['trashByTo'] = req.query['trashByTo']}
    if(req.query['deletedByTo']){ queryObj['deletedByTo'] = req.query['deletedByTo']}
    if(!page){page=1;}
    if(!size){size = 5;}
    const limit = parseInt(size);
    const skip = (page-1)*size;
    console.log(queryObj)
    queryObj['to'] = req.params.id;
    var query = Message.find(queryObj).sort(sort).limit(limit).skip(skip)
    query.exec((error, data) => {
      if (error) {
        console.log(error);
        req.myStatus = String(error);
        next();
      } else {
        var messages = [];
        for (let i = 0; i < data.length; i++) {
          var message = {}
          message._id = data[i]._id;
          message.content = data[i].content;
          message.createdAt = data[i].createdAt;
          message.from = data[i].from;
          message.fromName = data[i].fromName;
          message.title = data[i].title;
          message.to = data[i].to;
          message.toName = data[i].toName;
          message.trashByTo = data[i].trashByTo;
          message.trashByFrom = data[i].trashByFrom;
          message.deletedByTo = data[i].deletedByTo;
          message.deletedByFrom = data[i].deletedByFrom;
          messages.push(message);
        }
        res.json(messages);
        req.myStatus = "OK";
        next();
      }
    })
}


module.exports.getOutbox = (req, res, next) => {
    let page, size;
    let queryObj = {};
    if(req.query['page']){ page = req.query['page']} else page = 1;
    if(req.query['size']){ size = req.query['size']} else size = 5;
    if(req.query['sort']){ sort = req.query['sort']} else sort = 'createdAt';
    if(req.query['trashByFrom']){ queryObj['trashByFrom'] = req.query['trashByFrom']}
    if(req.query['deletedByFrom']){ queryObj['deletedByFrom'] = req.query['deletedByFrom']}
    if(!page){page=1;}
    if(!size){size = 5;}
    const limit = parseInt(size);
    const skip = (page-1)*size;
    console.log(req.params)
    queryObj['from'] = req.params.id;
    console.log(queryObj)
    var query = Message.find(queryObj).sort(sort).limit(limit).skip(skip)
    query.exec((error, data) => {
      if (error) {
        console.log(error);
        req.myStatus = String(error);
        next();
      } else {
        var messages = [];
        for (let i = 0; i < data.length; i++) {
          var message = {}
          message._id = data[i]._id;
          message.content = data[i].content;
          message.createdAt = data[i].createdAt;
          message.from = data[i].from;
          message.fromName = data[i].fromName;
          message.title = data[i].title;
          message.to = data[i].to;
          message.toName = data[i].toName;
          message.trashByTo = data[i].trashByTo;
          message.trashByFrom = data[i].trashByFrom;
          message.deletedByTo = data[i].deletedByTo;
          message.deletedByFrom = data[i].deletedByFrom;
          messages.push(message);
        }
        res.json(messages);
        req.myStatus = "OK";
        next();
      }
    })
}


module.exports.getMessage = (req, res, next) => {
    Message.findById(req.params.id, (error, data) => {
        if (error) {
          console.log(error);
          req.myStatus = String(error);
          next();
        } else {
          res.status(200).json({ status: true, data: _.pick(data, ['deletedByFrom', 'deletedByTo', 'content', 'createdAt', 'from', 'fromName', 'title', 'to', 'toName', 'trashByFrom', 'trashByTo']) });
          req.myStatus = "OK";
          next();
        }
      })
}

module.exports.updateMessage = (req, res, next) => {
    Message.findByIdAndUpdate(req.params.id, {
      $set: req.body
    }, (error, data) => {
      if (error) {
        console.log(error)
        req.myStatus = String(error);
        next();
      } else {
        res.status(200).json({ status: true, data: _.pick(data, ['deletedByFrom', 'deletedByTo', 'content', 'createdAt', 'from', 'fromName', 'title', 'to', 'toName', 'trashByFrom', 'trashByTo']) });
        req.myStatus = "OK";
        next();
      }
    })
}

module.exports.deleteMessage = (req, res, next) => {
  console.log("delete message", req)
    Message.findByIdAndDelete(req.params.id, (error, data) => {
      if (error) {
        console.log(error);
        req.myStatus = String(error);
        next();
      } else {
        res.status(200).json({
          msg: data
        })
        req.myStatus = "OK";
        next();
      }
    })
}
