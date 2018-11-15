let mongoose = require('mongoose')
let Schema = mongoose.Schema

let testSchema = new Schema({
  name: String
})

module.exports = mongoose.model('test', testSchema)
