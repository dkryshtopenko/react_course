const express = require('express');
const bodyParser = require('body-parser');
const eventMethods = require('../events');
const logger = require('../../homework_1/logger');
const { PORT } = require('../../homework_1/config');

const Models = require("../models");

Models.sequelize.sync().then(() => {

    const app = express();

    app.use(bodyParser.json());

    // curl localhost:3000/events?location=lviv
    app.get('/events', eventMethods.getEvents);

    // curl --request POST 'http://localhost:3000/events' \
    // --header 'Content-Type: application/json' \
    // --data-raw '{
    //    "title": "test",
    //    "location": "odesa"
    // }'
    app.post('/events', eventMethods.insertEvent);

    // curl localhost:3000/events/2
    app.get('/events/:id', eventMethods.getEventById);

    //  curl --request DELETE http://localhost:3000/events/3
    app.delete('/events/:id', eventMethods.removeEvent);

    // curl --location --request PUT 'http://localhost:3000/events/1' \
    // --header 'Content-Type: application/json' \
    // --data-raw '{
    //    "title": "test",
    //    "location": "odesa"
    // }'
    app.put('/events/:id', eventMethods.updateEvent);

    app.listen(PORT, () => {
        logger.log(`Listening on port ${PORT}`)
    });
});
