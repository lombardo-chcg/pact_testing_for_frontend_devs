(function () {
  'use strict'

  const axios = require('axios');
  const path = require('path');
  const Pact = require('pact');
  const pactMockServer = require('@pact-foundation/pact-node');
  const userService = require('./userService');
  const port = 8989;

  const eachLike = Pact.Matchers.eachLike;
  const somethingLike = Pact.Matchers.somethingLike;

  describe("UserService API Interactions", () => {
    let url = 'http://localhost'
    let provider

      const server = pactMockServer.createServer({
        port: port,
        log: path.resolve(process.cwd(), 'logs', 'mockserver-integration.log'),
        dir: path.resolve(process.cwd(), 'pacts'),
        spec: 2,
        consumer: 'UserService',
        provider: 'UserBackendApiService'
    });

    afterAll(() => {
      pactMockServer.removeAllServers();
    })

    afterEach(done => {
      server.delete().then(done);
    });

    beforeEach(done => {
      process.env.API_HOST = `http://localhost:${port}`;

      server.start().then(() => {
        provider = Pact({
          consumer: 'UserService',
          provider: 'UserBackendApiService',
          port: port
        });

        done();
      });
    });

    const responseBody = {
      users: eachLike({
        address: somethingLike('Some Addy'),
        bio: somethingLike('Some Bio'),
        email: somethingLike('Some Email'),
        name: somethingLike('Some Name'),
        favorite_colors: eachLike('#hexColor')
      })
    }

    describe("works", () => {
      beforeEach(done => {
        const interaction = {
          state: 'when the User API service is running and populated with user data',
          uponReceiving: 'a request for all users',
          withRequest: {
            method: 'GET',
            path: '/api/users',
            headers: { 'Accept': 'application/json' }
          },
          willRespondWith: {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
            body: responseBody
          }
        }
        provider.addInteraction(interaction).then(done, done);
      })

      afterEach(done => {
        return provider.finalize().then(done, done);
      })

      it('successfully verifies', done => {
          return userService
            .getUserData()
            .then(response => {
              expect(response.status).toEqual(200);
              expect(response.data.users[0].name).toEqual('Some Name');
              done();
            })
            .catch(response => {
              console.log("PACT ERROR!!", response);
              done();
            });
      })
    })
  })
}());
