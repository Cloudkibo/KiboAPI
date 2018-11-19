const Test = require('./test.model')

exports.index = function (req, res) {
  let testObject = new Test({name: req.body.name})
  testObject.save().then(result => {
    return res.status(200).json({status: 'success', payload: result})
  })
}
