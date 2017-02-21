/*jshint esversion: 6 */

(function () {
  'use strict';
  const exports = module.exports = {};

  const axios = require('axios');
  const API_HOST = process.env.API_HOST || 'http://localhost:8080';

  exports.getUserData = getUserData;

  function getUserData() {

    return axios.request({
      method: 'GET',
      baseURL: API_HOST,
      url: '/api/users',
      headers: { 'Accept': 'application/json' }
    });
  }
}());
