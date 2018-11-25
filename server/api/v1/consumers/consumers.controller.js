const dataLayer = require('./consumers.datalayer')

exports.updateProductStatus = function (req, res) {
  dataLayer.findOne({companyId: req.body.companyId, userId: req.body.userId})
    .then(consumer => {
      dataLayer.saveObject(consumer)
        .then(updated => {
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
