const utility = require('../../utility')

exports.createForBroadcast = (payload) => {
  return utility.callApi(`broadcasts`, 'post', payload, '', 'kiboEngageDBLayer')
}
exports.createForBroadcastPage = (payload) => {
  return utility.callApi(`page_broadcast`, 'post', payload, '', 'kiboEngageDBLayer')
}
