let mongoose = require('mongoose')
let Schema = mongoose.Schema

let consumerSchema = new Schema({
  consumerId: {
    userId: String,
    companyId: String
  },
  credentials: {
    api_key: String,
    api_secret: String
  },
  scope: {
    type: Schema.Types.Mixed,
    default: {kibochat: false, kibocommerce: false, kiboengage: false}
  }
})

module.exports = mongoose.model('api_consumers', consumerSchema)
