"use strict";

require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');

const db = require('./db').createDb;
const handlers = require('./handler');
const helpMessage = require('./help-message');
const middleware = require('./middleware');

const app = express();
const port_num = process.env.PORT_NUMBER || 8080;

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(middleware.slackauth);
app.use((req, res, next) => {
  res.setHeader('Content-type', 'application/json');
  next();
});

// Initialize
db();

app.post('/', async (req, res) => {
  var resMessage;
  switch (req.body.command) {
    case '/test':
      resMessage = 'test';
      break;
    case '/hc_init':
      resMessage = await handlers.init(req);
      break;
    case '/hc_give':
      resMessage = await handlers.give(req);
      break;
    case '/hc_get':
      resMessage = await handlers.get(req);
      break;
    case '/hc_help':
      resMessage = helpMessage.message;
      break;
    default:
      console.log('Lol how did you do this');
  }
  res.status(200).send({
    responseType: "in_channel",
    text: resMessage
  });
});

app.listen(port_num, () => {
  console.log(`Listening on port ${port_num}`);
});
