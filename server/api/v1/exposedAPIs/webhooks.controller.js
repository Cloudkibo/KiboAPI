const utility = require('../utility')
const {validateInput, validateInputForEdit} = require('./webhooks/webhooks.logiclayer')
const needle = require('needle')

exports.createWebhook = function (req, res) {
  if (!validateInput(req.body)) {
    return res.status(400)
      .send({status: 'failed', description: 'Please fill all the required fields'})
  }
  utility.callApi(`companyUser/query`, 'post', {userId: req.consumer.consumerId.userId, companyId: req.consumer.consumerId.companyId}, req.headers.consumer_id) // fetch company user
    .then(companyUser => {
      utility.callApi(`webhooks/query`, 'post', {companyId: companyUser.companyId, pageId: req.body.pageId}, req.headers.consumer_id)
        .then(webhooks => {
          if (webhooks && webhooks.length > 0) {
            return res.status(403).send({status: 'failed', description: 'Webhook for this page is already set'})
          } else {
            var url = req.body.webhook_url + '?token=' + req.body.token
            needle.get(url, (err, r) => {
              if (err) {
                return res.status(404).send({status: 'failed', description: 'This URL contains an invalid domain or the server at the given URL is not live.'})
              }
              if (r.statusCode === 200) {
                utility.callApi(`webhooks`, 'post', {
                  webhook_url: req.body.webhook_url,
                  companyId: companyUser.companyId,
                  userId: req.consumer.consumerId.userId,
                  isEnabled: true,
                  optIn: req.body.optIn,
                  pageId: req.body.pageId
                })
                  .then(createdWebhook => {
                    return res.status(201).send({status: 'success', payload: createdWebhook})
                  })
                  .catch(error => {
                    return res.status(500).send({
                      status: 'failed',
                      payload: `Failed to create webhook ${JSON.stringify(error)}`
                    })
                  })
              } else {
                return res.status(404).send({status: 'failed', description: 'This URL contains an invalid domain or the server at the given URL is not live.'})
              }
            })
          }
        })
        .catch(error => {
          return res.status(500).send({
            status: 'failed',
            payload: `Failed to fetch webhook ${JSON.stringify(error)}`
          })
        })
    })
    .catch(error => {
      return res.status(500).send({
        status: 'failed',
        payload: `Failed to fetch company user ${JSON.stringify(error)}`
      })
    })
}

exports.editWebhook = function (req, res) {
  if (!validateInputForEdit(req.body)) {
    return res.status(400)
      .send({status: 'failed', description: 'Please fill all the required fields'})
  }
  var url = req.body.webhook_url + '?token=' + req.body.token
  needle.get(url, (err, r) => {
    if (err) {
      return res.status(404).send({status: 'failed', description: 'This URL contains an invalid domain or the server at the given URL is not live.'})
    }
    if (r.statusCode === 200) {
      utility.callApi(`webhooks/${req.body.webhook_id}`, 'put', {
        webhook_url: req.body.webhook_url,
        optIn: req.body.optIn,
        userId: req.consumer.consumerId.userId})
        .then(edited => {
          res.status(201).send({status: 'success', payload: edited})
        })
        .catch(error => {
          return res.status(500).send({
            status: 'failed',
            payload: `Failed to update webhook ${JSON.stringify(error)}`
          })
        })
    } else {
      return res.status(404).send({status: 'failed', description: 'This URL contains an invalid domain or the server at the given URL is not live.'})
    }
  })
}
