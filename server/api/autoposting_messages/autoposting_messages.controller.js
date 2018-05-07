const AutopostingMessages = require('./autoposting_messages.model')
const CompanyUsers = require('./../companyuser/companyuser.model')

exports.index = function (req, res) {
  CompanyUsers.findOne({domain_email: req.user.domain_email}, (err, companyUser) => {
    if (err) {
      return res.status(500).json({
        status: 'failed',
        description: `Internal Server Error ${JSON.stringify(err)}`
      })
    }
    if (!companyUser) {
      return res.status(404).json({
        status: 'failed',
        description: 'The user account does not belong to any company. Please contact support'
      })
    }
    AutopostingMessages.find({companyId: companyUser.companyId, autopostingId: req.params.id})
    .populate('pageId companyId autopostingId')
    .exec((err, autopostingMessages) => {
      if (err) {
        return res.status(500)
        .json({status: 'failed', description: 'Autoposting query failed'})
      }
      res.status(200).json({
        status: 'success',
        payload: autopostingMessages
      })
    })
  })
}

exports.getMessages = function (req, res) {
  CompanyUsers.findOne({domain_email: req.user.domain_email}, (err, companyUser) => {
    if (err) {
      return res.status(500).json({
        status: 'failed',
        description: `Internal Server Error ${JSON.stringify(err)}`
      })
    }
    if (!companyUser) {
      return res.status(404).json({
        status: 'failed',
        description: 'The user account does not belong to any company. Please contact support'
      })
    }
    AutopostingMessages.find({companyId: companyUser.companyId, autopostingId: req.params.id})
    .populate('pageId companyId autopostingId')
    .exec((err, autopostingMessages) => {
      if (err) {
        return res.status(500)
        .json({status: 'failed', description: 'Autoposting query failed'})
      }
      res.status(200).json({
        status: 'success',
        payload: autopostingMessages
      })
    })
  })
}
