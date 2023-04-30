const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// Define collection and schema
let Log = new Schema({
   userId: {
      type: String
   },
   userName: {
      type: String
   },
   ip: {
      type: String
   },
   browser: {
      type: String
   },
   time: {
      type: Date
   },
   actionType: {
      type: String,
      enum: ["GET","POST","PUT","PATCH","DELETE",
      "COPY","HEAD","OPTIONS","LINK","UNLINK","PURGE"
      ,"LOCK","UNLOCK","PROPFIND","VIEW","SIGNUP",
      "LOGIN","LOGOUT"]
   },
   dataType: {
      type: String,
      enum: ["message","user",""]
   },
   status: {
      type: String
   }
}, {
   collection: 'logs'
})
module.exports = mongoose.model('Log', Log)