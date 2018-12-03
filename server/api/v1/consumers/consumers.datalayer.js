const ConsumerModel = require('./consumers.model')

exports.saveObject = (consumer) => {
  return consumer.save()
}
exports.findOne = (query) => {
  return ConsumerModel.findOne(query)
    .exec()
}

exports.createObject = (consumer) => {
  let obj = new ConsumerModel(consumer)
  return obj.save()
}

exports.updateObject = (objectId, payload) => {
  return ConsumerModel.updateOne({_id: objectId}, payload)
    .exec()
}
