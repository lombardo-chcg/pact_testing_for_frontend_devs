# Pact Testing for Front End Developers

This repo consists of material used in my talk *Pact Testing for Front End Developers*, delivered Feb 21, 2017 at the [Chicago JavaScript Meetup Group](https://www.meetup.com/js-chi/).

* `/backend` is a sample node api
* `/frontend` is a sample webpack app that consumes from the sample backened app.  It also contains a sample Pact contract test implementation.

In the root you'll find the slides, and a `docker-compose` file to start a Pact Broker and Postgres DB.

### Start the Back End
```
cd backend
npm install
node app.js
# content available from http://localhost:3000/users
```

### Start the Front End
```
cd frontend
npm install
npm start
# site available at http://localhost:8080
```

### Run the test
```
cd frontend
export API_HOST=http://localhost:8989
npm test
```

### Start the Pack Mock Server
*WARNING!  no volumes are mounted and published contracts will not persist after containers are brought down*
```
docker-compose up
# UI available at http://192.168.99.100/ui/relationships
```

### Publish sample contracts
```
docker-compose up -d
./scripts/publish_dummy_contracts.sh
```
