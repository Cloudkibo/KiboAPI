const ConsumerModel = require('./consumers.model')

exports.saveObject = (consumer) => {
  return consumer.save()
}
exports.findOne = (query) => {
  return ConsumerModel.findOne(query)
    .exec()
}
