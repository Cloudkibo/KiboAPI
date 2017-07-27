'use strict';

var express = require('express');

var router = express.Router();

var logger = require('../../components/logger');

var Users = require('../user/user.model').Users;

var auth = require('../../auth/auth.service');

const TAG = 'api/thing/index.js';

router.get('/', auth.isAuthenticated(), function (req, res) {
  logger.serverLog(TAG, 'things api is working');
  res.status(200).json({status: 'success'});
});

router.get('/fetch', function (req, res) {
  logger.serverLog(TAG, 'things api is working');
  Users.findAll().then(function(data){
    res.status(200).json({status: 'success', data: data});
  });
});

module.exports = router;
