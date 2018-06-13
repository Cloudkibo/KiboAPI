'use strict'

var mongoose = require('mongoose')
var Schema = mongoose.Schema
var stripeCustomer = require('./stripecustomer')
var config = require('../../config/environment/index')

var CompanyprofileSchema = new Schema({

  companyName: String,
  companyDetail: String,
  ownerId: { type: Schema.ObjectId, ref: 'users' },
  automated_options: {
    type: String,
    default: 'MIX_CHAT'
  }
  // automated_options: {
  //   type: String,
  //   enum: ['AUTOMATED_CHAT', 'HUMAN_CHAT', 'MIX_CHAT'],
  //   default: 'MIX_CHAT'
  // }

})

var stripeOptions = config.stripeOptions
CompanyprofileSchema.plugin(stripeCustomer, stripeOptions)

module.exports = mongoose.model('companyprofile', CompanyprofileSchema)
