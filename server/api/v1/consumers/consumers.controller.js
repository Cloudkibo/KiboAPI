const dataLayer = require('./consumers.datalayer')

exports.updateProductStatus = function (req, res) {
  console.log('updateProductStatus', req.body)
  dataLayer.findOne({companyId: req.body.companyId, userId: req.body.userId})
    .then(consumer => {
      console.log('consuer', consumer)
      consumer.scope[req.body.scope.key] = req.body.scope.value === 'true'
      console.log('updateValye', consumer)
      dataLayer.saveObject(consumer)
        .then(updated => {
          console.log('updated', updated)
          return res.status(200).json({
            status: 'success',
            payload: updated
          })
        })
        .catch(error => {
          return res.status(500).json({
            status: 'failed',
            payload: `Failed to update status ${JSON.stringify(error)}`
          })
        })
    })
    .catch(error => {
      return res.status(500).json({
        status: 'failed',
        payload: `Failed to find consumer ${JSON.stringify(error)}`
      })
    })
}
