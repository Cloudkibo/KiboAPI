var db = require('../../components/db').sequelize;
var Sequelize = require('sequelize');

const Links = db.define('links', {
  linkTitle: {
    type: Sequelize.STRING
  },
  linkDescription: {
    type: Sequelize.STRING
  },
  linkUrl: {
    type: Sequelize.STRING
  },
});

exports.Links = Links;