const ConsumerModel = require('./consumers.model')

exports.updateOne = (query, updated) => {
  return ConsumerModel.updateOne(query, updated)
    .exec()
}

exports.findOne = (query) => {
  return ConsumerModel.findOne(query)
    .exec()
}
