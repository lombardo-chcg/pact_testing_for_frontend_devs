'use strict';

var axios = require('axios');

var exports = module.exports = {};

exports.getUserData = getUserData;

function getUserData() {
  return axios.get('/api/users');
}
