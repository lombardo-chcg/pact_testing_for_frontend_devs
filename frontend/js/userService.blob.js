// const path = require('path');
// const chai = require('chai');
// const chaiAsPromised = require('chai-as-promised');
// const expect = chai.expect;
// const pact = require('pact');
// const mockservice = require('@pact-foundation/pact-node');
// const MOCK_SERVER_PORT = 1234;
//
// const userService = require('./userService');
//
// chai.use(chaiAsPromised);
//
// describe('Pact', () => {
//   let provider;
//
//   const term = pact.Matchers.term;
//   const like = pact.Matchers.somethingLike;
//   const eachLike = pact.Matchers.eachLike;
//
//   const mockServer = mockservice.createServer({
//     port: MOCK_SERVER_PORT,
//     log: path.resolve(process.cwd(), 'logs', 'mockserver-integration.log'),
//     dir: path.resolve(process.cwd(), 'pacts'),
//     spec: 2
//   });
//   mockservice.logLevel('WARN');
//
//   before(done => {
//     mockServer.start()
//       .then(() => {
//         provider = pact({
//           consumer: 'userService',
//           provider: 'userBackendApi',
//           port: MOCK_SERVER_PORT
//         })
//         console.log(provider)
//       });
//
//
//     return provider.addInteraction({
//       state: 'starting state',
//       uponRecieving: 'a request',
//       withRequest: {
//            method: 'GET',
//            path: '/api/users'
//          },
//       willRespondWith: {
//         status: 200,
//         headers: {
//           'Content-Type': 'application/json; charset=utf-8'
//         },
//         body: {fuck: true}
//       }
//     })
//     .then(() => done())
//     .catch(error => {
//         console.log('PACT PROVIDER ERROR: ', error);
//         done();
//     });
//   });
//
//   process.env.API_HOST = `http://localhost:${MOCK_SERVER_PORT}`;
//
//   describe('get call', () => {
//     it('does some crap', () => {
//       userService
//         .getUserData()
//         .then(() => {
//           expect(response.status).to.equal(200)
//         })
//         .catch(error => {
//           console.log('PACT IT BLOCK ERROR: ', error);
//           done();
//         });
//     });
//   });
//
//   after(() => {
//     provider.finalize().then(() => {
//       mockservice.removeAllServers();
//     });
//   });
//
// });
