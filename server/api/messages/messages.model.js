var db = require('../../components/db').sequelize;
var Sequelize = require('sequelize');

const Messages = db.define('message', {
  type: {
    type: Sequelize.STRING
  },
  text: {
    type: Sequelize.STRING
  },


});

exports.Messages = Messages;