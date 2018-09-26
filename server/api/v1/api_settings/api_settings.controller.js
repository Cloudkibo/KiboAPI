/**
 * Created by sojharo on 24/11/2017.
 */

// eslint-disable-next-line no-unused-vars
const logger = require('../../../components/logger')
// eslint-disable-next-line no-unused-vars
const TAG = 'api/api_settings/api_ngp.controller.js'

const ApiSettings = require('./api_settings.model')
const crypto = require('crypto')
const _ = require('lodash')

exports.index = function (req, res) {
  if (!_.has(req.body, 'company_id')) {
    return res.status(400)
    .json({status: 'failed', description: 'Parameters are missing. company_id is required'})
  }

  ApiSettings.findOne({company_id: req.body.company_id}, (err, settings) => {
    if (err) {
      return res.status(500)
      .json({status: 'failed', description: 'API query failed'})
    }
    if (!settings) {
      return res.status(404)
      .json({
        status: 'failed',
        description: 'API settings not initialized or invalid user. Call enable API to initialize them.'
      })
    }
    res.status(200).json({
      status: 'success',
      payload: settings
    })
  })
}

exports.enable = function (req, res) {
  if (!_.has(req.body, 'company_id')) {
    return res.status(400)
    .json({status: 'failed', description: 'Parameters are missing. company_id is required'})
  }

  ApiSettings.findOne({company_id: req.body.company_id}, (err, settings) => {
    if (err) {
      return res.status(500)
        .json({status: 'failed', description: 'API query failed'})
    }
    if (!settings) {
      let uid = crypto.randomBytes(10).toString('hex')
      let pwd = crypto.randomBytes(18).toString('hex')
      let newSettings = new ApiSettings({
        company_id: req.body.company_id,
        enabled: true,
        app_id: uid,
        app_secret: pwd
      })
      newSettings.save((err, savedSettings) => {
        if (err) {
          return res.status(500)
            .json({status: 'failed', description: 'API save failed'})
        }
        res.status(201).json({
          status: 'success',
          payload: savedSettings
        })
      })
    } else {
      settings.enabled = true
      settings.save((err, savedSettings) => {
        if (err) {
          return res.status(500)
            .json({status: 'failed', description: 'API save failed'})
        }
        res.status(201).json({
          status: 'success',
          payload: savedSettings
        })
      })
    }
  })
}

exports.disable = function (req, res) {
  if (!_.has(req.body, 'company_id')) {
    return res.status(400)
    .json({status: 'failed', description: 'Parameters are missing. company_id is required'})
  }

  ApiSettings.findOne({company_id: req.body.company_id}, (err, settings) => {
    if (err) {
      return res.status(500)
        .json({status: 'failed', description: 'API query failed'})
    }
    if (!settings) {
      return res.status(404)
        .json({
          status: 'failed',
          description: 'API settings not initialized. Call enable API to initialize them.'
        })
    }
    settings.enabled = false
    settings.save((err, savedSettings) => {
      if (err) {
        return res.status(500)
          .json({status: 'failed', description: 'API save failed'})
      }
      res.status(201).json({
        status: 'success',
        payload: savedSettings
      })
    })
  })
}

exports.reset = function (req, res) {
  if (!_.has(req.body, 'company_id')) {
    return res.status(400)
    .json({status: 'failed', description: 'Parameters are missing. company_id is required'})
  }

  ApiSettings.findOne({company_id: req.body.company_id}, (err, settings) => {
    if (err) {
      return res.status(500)
      .json({status: 'failed', description: 'API query failed'})
    }
    if (!settings) {
      return res.status(404)
      .json({
        status: 'failed',
        description: 'API settings not initialized or user not found. Call enable API to initialize them.'
      })
    }
    let uid = crypto.randomBytes(10).toString('hex')
    let pwd = crypto.randomBytes(18).toString('hex')
    settings.app_id = uid
    settings.app_secret = pwd
    settings.save((err, savedSettings) => {
      if (err) {
        return res.status(500)
        .json({status: 'failed', description: 'API save failed'})
      }
      res.status(200).json({
        status: 'success',
        payload: savedSettings
      })
    })
  })
}
