const ConsumerModel = require('./consumers.model')

exports.updateObject = (query, updated, options) => {
  return ConsumerModel.findByIdAndUpdate(query, updated, options)
    .exec()
}
exports.findOne = (query) => {
  return ConsumerModel.findOne(query)
    .exec()
}

exports.createObject = (consumer) => {
  let obj = new ConsumerModel(consumer)
  return obj.save()
}
