let mongoose = require('mongoose')
let Schema = mongoose.Schema

let consumerSchema = new Schema({
  consumerId: Schema.Types.Mixed,
  credentials: Schema.Types.Mixed,
  scope: {
    type: Schema.Types.Mixed,
    default: {kiboPush: false, kiboCommerce: false, kiboEngage: false}
  }
})

module.exports = mongoose.model('api_consumers', consumerSchema)
