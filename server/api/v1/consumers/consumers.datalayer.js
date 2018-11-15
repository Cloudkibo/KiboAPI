const ConsumerModel = require('./consumers.model')

exports.updateOne = (query, updated) => {
  return ConsumerModel.updateOne(query, updated)
    .exec()
}
