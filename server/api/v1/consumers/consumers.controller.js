const dataLayer = require('./consumers.datalayer')

exports.updateProductStatus = function (req, res) {
  console.log('req.body', req.body)
  dataLayer.findOne({_id: req.body._id})
    .then(consumer => {
      console.log('consumer', (req.body.scope.value === 'true'))
      consumer.scope[req.body.scope.key] = (req.body.scope.value === 'true')
      console.log('consumer updated', consumer)
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
