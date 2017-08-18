// WE are referring Messages as Broadcasts, broadcasts and messages will be same thing
// Zarmeen

var mongoose = require('mongoose')
var Schema = mongoose.Schema

var broadcastSchema = new Schema({
  platform: String, // TODO define this as enum with values, for now value is facebook
  type: String, // TODO define this as enum with values ['text','attachment']
  text: String, // message body
  userId: {type: Schema.ObjectId, ref: 'users'},
  datetime: {type: Date, default: Date.now},
  fileurl: String,
  attachmentType: String
  //  pageId: String, [discuss with sojharo, will we keep it or not]
})

module.exports = mongoose.model('broadcasts', broadcastSchema)
