/**
 * Created by sojharo on 27/07/2017.
 */

'use strict';

const express = require('express');

const router = express.Router();

const auth = require('../../auth/auth.service');
const controller = require('./dashboard.controller');

const logger = require('../../components/logger');

const TAG = 'api/pages/index.js';

router.get('/:id', controller.index); //this id will be userid
router.get('/otherPages', controller.otherPages);
router.post('/enable', controller.enable);
router.post('/disable', controller.disable);



/* Seed Pages */
router.get('/seed', controller.seed);

module.exports = router;