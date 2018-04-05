'use strict'

var mongoose = require('mongoose')
var Schema = mongoose.Schema

var CompanyprofileSchema = new Schema({

  companyName: String,
  companyDetail: String,
  ownerId: { type: Schema.ObjectId, ref: 'users' }

})

module.exports = mongoose.model('companyprofile', CompanyprofileSchema)