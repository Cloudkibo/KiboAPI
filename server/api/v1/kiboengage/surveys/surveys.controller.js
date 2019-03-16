/* eslint-disable camelcase */
/**
 * Created by sojharo on 27/07/2017.
 */

const utility = require('../../utility')

exports.allSurveys = function (req, res) {
  utility.callApi(`surveys/allSurveys`, 'post', req.body, req.headers.consumer_id, 'kiboengage')
    .then(response => {
      return res.status(500).json({ status: 'success', payload: response })
    })
    .catch(err => {
      return res.status(500).json({status: 'failed', payload: err})
    })
}

exports.create = function (req, res) {
  utility.callApi(`surveys/create`, 'post', req.body, req.headers.consumer_id, 'kiboengage')
    .then(response => {
      return res.status(500).json({ status: 'success', payload: response })
    })
    .catch(err => {
      return res.status(500).json({status: 'failed', payload: err})
    })
}

exports.edit = function (req, res) {
  utility.callApi(`surveys/edit`, 'post', req.body, req.headers.consumer_id, 'kiboengage')
    .then(response => {
      return res.status(500).json({ status: 'success', payload: response })
    })
    .catch(err => {
      return res.status(500).json({status: 'failed', payload: err})
    })
}

// Get a single survey
exports.show = function (req, res) {
  utility.callApi(`surveys/${req.params.id}`, 'get', {}, req.headers.consumer_id, 'kiboengage')
    .then(response => {
      return res.status(500).json({ status: 'success', payload: response })
    })
    .catch(err => {
      return res.status(500).json({status: 'failed', payload: err})
    })
}

// Get a single survey
exports.showQuestions = function (req, res) {
  utility.callApi(`surveys/showquestions/${req.params.id}`, 'get', {}, req.headers.consumer_id, 'kiboengage')
    .then(response => {
      return res.status(500).json({ status: 'success', payload: response })
    })
    .catch(err => {
      return res.status(500).json({status: 'failed', payload: err})
    })
}

exports.send = function (req, res) {
  utility.callApi(`surveys/send`, 'post', req.body, req.headers.consumer_id, 'kiboengage')
    .then(response => {
      return res.status(500).json({ status: 'success', payload: response })
    })
    .catch(err => {
      return res.status(500).json({status: 'failed', payload: err})
    })
}
exports.sendSurvey = function (req, res) {
  utility.callApi(`surveys/sendSurveyDirectly`, 'post', req.body, req.headers.consumer_id, 'kiboengage')
    .then(response => {
      return res.status(500).json({ status: 'success', payload: response })
    })
    .catch(err => {
      return res.status(500).json({status: 'failed', payload: err})
    })
}
exports.deleteSurvey = function (req, res) {
  utility.callApi(`surveys/deleteSurvey/${req.params.id}`, 'delete', {}, req.headers.consumer_id, 'kiboengage')
    .then(response => {
      return res.status(500).json({ status: 'success', payload: response })
    })
    .catch(err => {
      return res.status(500).json({status: 'failed', payload: err})
    })
}
