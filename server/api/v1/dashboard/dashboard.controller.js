const Test = require('./test.model')

exports.index = function (req, res) {
  Test.find({}).exec().then(data => {
    return res.status(200).json(data)
  })
  .catch((err) => {
    return res.status(500).json({
      status: 'failed',
      description: `Internal Server Error ${JSON.stringify(err)}`
    })
  })
}
exports.create = function (req, res) {
  let payload = {
    name: req.body.name
  }
  let testObject = new Test(payload)
  testObject.save().then(data => {
    return res.status(200).json(data)
  })
  .catch((err) => {
    return res.status(500).json({
      status: 'failed',
      description: `Internal Server Error ${JSON.stringify(err)}`
    })
  })
}
