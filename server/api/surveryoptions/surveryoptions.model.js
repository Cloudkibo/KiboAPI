var db = require('../../components/db').sequelize;
var Sequelize = require('sequelize');

const surveyOptions = db.define('surveyOption', {
  item: {
    type: Sequelize.STRING
  },
});

exports.surveyOptions = surveyOptions;