(function () {
  'use strict';

  require('../css/bootstrap.css');
  require('../css/app.less');

  var userService = require('./userService');

  document
    .getElementById('fetchButton')
    .addEventListener("click", handleFetchRequest);

  function handleFetchRequest() {
    userService
      .getUserData()
      .then(appendUserData)
      .catch(displayError);
  }

  function appendUserData(serverResponse) {
    console.log(serverResponse.data)
    serverResponse
      .data
      .users
      .forEach(user => {
        let userNode = createUserNode(user);

        addToDOM(userNode);
      });
  }

  function displayError() {
    addToDOM('<h3>Server Error</h3>');
  }

  function addToDOM(text) {
    document
      .getElementById('userContainer')
      .innerHTML += text;
  }

  function createUserNode(user) {
    function genColorStyle(index) {
      return `style="background-color:${user.favorite_colors[index]};"`
    }

    return (
      `<ul class="list-group" style="color:white;">
        <li ${genColorStyle(0)} class="list-group-item">${user.name}</li>
        <li ${genColorStyle(1)} class="list-group-item">${user.address}</li>
        <li ${genColorStyle(2)} class="list-group-item">${user.bio}</li>
        <li ${genColorStyle(4)} class="list-group-item">${user.email}</li>
      </ul>`
    );
  }
}());
