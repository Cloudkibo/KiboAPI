const logger = require('../../../components/logger')
const logicLayer = require('./test.logiclayer')
const dataLayer = require('./test.datalayer')
const TAG = '/api/v1/test/index.js'
const Test = require('./test.model')

exports.index = function (req, res) {
  // logger.serverLog(TAG, 'Hit the test index')
  // let afterLogic = logicLayer.appendTestMessageToName(req.body.name)
  // dataLayer.saveTestDocument(afterLogic)
  //   .then(result => {
  //     res.status(200).json({status: 'success', payload: result})
  //   })
  console.log('inside index', req.body)
  let testObject = new Test({name: 'testing'})
  testObject.save().then(result => {
    console.log('result', result)
    return res.status(200).json({status: 'success', payload: result})
  })
}
