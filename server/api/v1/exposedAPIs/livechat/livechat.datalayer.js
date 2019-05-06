const utility = require('../../utility')

exports.createForChat = (payload) => {
  return utility.callApi(`livechat`, 'post', payload, '', 'kiboChatDBLayer')
}
