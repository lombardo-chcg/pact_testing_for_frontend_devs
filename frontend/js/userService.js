'use strict';

var axios = require('axios');
var API_HOST = process.env.API_HOST || 'http://localhost:8080';

var exports = module.exports = {};

exports.getUserData = getUserData;

function getUserData() {
  
  return axios.request({
    method: 'GET',
    baseURL: API_HOST,
    url: '/api/users',
    headers: { 'Accept': 'application/json' }
  });
}
