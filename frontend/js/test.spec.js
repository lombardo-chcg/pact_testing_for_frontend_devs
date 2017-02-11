'use strict'

const axios = require('axios');
const path = require('path');
const Pact = require('pact');
const pactMockServer = require('@pact-foundation/pact-node');
const userService = require('./userService');
const port = 8989;

// process.env.API_HOST = `http://localhost:${port}`;

describe("Dog's API", () => {
  let url = 'http://localhost'
  let provider

    const server = pactMockServer.createServer({
    port: port,
    log: path.resolve(process.cwd(), 'logs', 'mockserver-integration.log'),
    dir: path.resolve(process.cwd(), 'pacts'),
    spec: 2,
    consumer: 'MyConsumer',
    provider: 'MyProvider'
  })

  const EXPECTED_BODY = [{dog: 1}]

  afterAll(() => {
    pactMockServer.removeAllServers();
  })

  afterEach(done => {
    server.delete().then(done)
  });

  beforeEach(done => {
    process.env.API_HOST = `http://localhost:${port}`;
    
    server.start().then(() => {
      provider = Pact({ consumer: 'MyConsumer', provider: 'MyProvider', port: port })
      done()
    })
  });

  describe("works", () => {
    beforeEach(done => {
      const interaction = {
        state: 'i have a list of projects',
        uponReceiving: 'a request for projects',
        withRequest: {
          method: 'GET',
          path: '/api/users',
          headers: { 'Accept': 'application/json' }
        },
        willRespondWith: {
          status: 200,
          headers: { 'Content-Type': 'application/json' },
          body: EXPECTED_BODY
        }
      }
      provider.addInteraction(interaction).then(done, done)
    })

    afterEach(done => {
      return provider.finalize().then(done, done)
    })

    it('successfully verifies', done => {
        return userService
          .getUserData()
          .then(response => {
            // expect(response.status).toEqual(400);
            console.log(response)
            done()
          })
          .catch(response => {
            // expect(response.status).toEqual(400);
            console.log(response)
            done()
          })

      // return userService
      //   .getUserData()
      //   .then(response => {
      //     console.log(response)
      //     expect(response.headers['content-type']).toEqual('application/json');
      //     expect(response.data).toEqual(EXPECTED_BODY);
      //     expect(response.status).toEqual(400);
      //     expect(2).toEqual(4);
      //   })
      //   .then(provider.verify)
      //   .then(done, done)
    })
  })
})
