const dataLayer = require('./consumers.datalayer')

exports.updateProductStatus = function (req, res) {
  let updatePayload = {
    'scope.kiboPush': req.body.kiboPush,
    'scope.kiboEngage': req.body.kiboEngage,
    'scope.kiboCommerce': req.body.kiboCommerce
  }
  dataLayer.updateOne({userId: req.body.userId, companyId: req.body.companyId}, updatePayload)
    .then(settings => {
      res.status(200).json({
        status: 'success',
        payload: settings
      })
    })
}
