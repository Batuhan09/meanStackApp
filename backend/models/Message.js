const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// Define collection and schema
let Message = new Schema({
   to: {
      type: String
   },
   toName: {
      type: String
   },
   from: {
      type: String
   },
   fromName: {
      type: String
   },
   title: {
      type: String
   },
   content: {
      type: String
   },
   createdAt: {
      type: Date
   },
   trashByFrom: {
      type: Boolean
   },
   trashByTo: {
      type: Boolean
   },
   deletedByFrom: {
      type: Boolean
   },
   deletedByTo: {
      type: Boolean
   },
}, {
   collection: 'messages'
})
module.exports = mongoose.model('Message', Message)