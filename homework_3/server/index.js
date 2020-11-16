const express = require('express');
const bodyParser = require('body-parser');
const eventMethods = require('../events');
const logger = require('../../homework_1/logger');
const { PORT } = require('../../homework_1/config');

const app = express();

app.use(bodyParser.json());

// curl localhost:3000/events?location=lviv
app.get('/events', eventMethods.getEvents);

// curl localhost:3000/events/2
app.get('/events/:id', eventMethods.getEvent);

//  curl --request DELETE http://localhost:3000/events/3
app.delete('/events/:id', eventMethods.remove);

// curl --request POST 'http://localhost:3000/events' \
// --header 'Content-Type: application/json' \
// --data-raw '{
//    "title": "test",
//    "location": "odesa",
//    "date": "1-1-1997",
//    "hour": "10:00"
// }'
app.post('/events', eventMethods.insert);

// curl --location --request PUT 'http://localhost:3000/events/1' \
// --header 'Content-Type: application/json' \
// --data-raw '{
//    "title": "test",
//    "location": "odesa",
//    "date": "1-1-1997",
//    "hour": "10:00"
// }'
app.put('/events/:id', eventMethods.update);

// curl localhost:3000/events-batch
app.get('/events-batch', eventMethods.getAll);

app.listen(PORT, () => {
    logger.log(`Listening on port ${PORT}`)
});
