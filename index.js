/* eslint-disable @typescript-eslint/no-var-requires */
require('ts-node').register();

const bodyParser = require('body-parser');
const connect = require('connect');
const http = require('http');

const { User, UserEvent, errorHandler, eventHandler, userHandler } = require('./src');

// Load sample data
const { users, events } = require('./src/database');
const userData = require('./data/users');
userData.forEach(user => {
  users[user.email] = new User(user);
});
const eventData = require('./data/events');
Object.keys(eventData).forEach(email => {
  events[email] = eventData[email].map(event => new UserEvent(event));
});

// Setup and run the server
const app = connect();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/events', eventHandler);
app.use('/users', userHandler);
app.use(errorHandler);
http.createServer(app).listen(8000);
console.log('Server now listening at http://0.0.0.0:8000');
