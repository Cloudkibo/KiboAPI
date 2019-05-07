let _ = require('lodash')

exports.prepareBroadCastPayload = (req, payload) => {
  let broadcastPayload = {
    payload: payload,
    userId: req.consumer.consumerId.userId,
    companyId: req.consumer.consumerId.companyId,
    title: req.body.title,
    platform: 'facebook',
    segmentationPageIds: [req.body.pageId]
  }
  if (req.body.segmentationGender) {
    broadcastPayload.segmentationGender = [req.body.segmentationGender.toLowerCase()]
  }
  return broadcastPayload
}
exports.subsFindCriteria = function (body, companyId) {
  let subscriberFindCriteria = {pageId: body.pageId, companyId: companyId, isSubscribed: true}
  if (body.segmentationGender && body.segmentationGender.length > 0) {
    subscriberFindCriteria = _.merge(subscriberFindCriteria,
      {
        gender: body.segmentationGender.toLowerCase()
      })
  }
  return subscriberFindCriteria
}
