var db = require('../../components/db').sequelize;
var Sequelize = require('sequelize');

const Broadcasts = db.define('broadcast', {
  platform: {
    type: Sequelize.STRING
  },
  type: {
    type: Sequelize.STRING
  },

});

exports.Broadcasts = Broadcasts;