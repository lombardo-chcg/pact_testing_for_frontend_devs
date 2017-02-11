'use strict';

var faker = require('faker');

var exports = module.exports = {};

exports.getFakeUser = getFakeUser;
exports.getRandomNum = getRandomNum;

function getFakeUser() {
  return {
    name: faker.name.findName(),
    email: faker.internet.email(),
    address: faker.address.streetAddress(),
    bio: faker.lorem.sentence(),
    favorite_colors: [
      faker.internet.color(),
      faker.internet.color(),
      faker.internet.color(),
      faker.internet.color(),
      faker.internet.color()
    ]
  };
}

function getRandomNum() {
  return Math.floor((Math.random()) * 1000);
}
