const express = require('express');
const bodyParser = require('body-parser');
const logger = require('../logger');
const { PORT } = require('../config');

const Models = require("../models");

Models.sequelize.sync().then(() => {

    const app = express().use(bodyParser.json());

    require('../routes/auth.routes')(app);
    require('../routes/user.routes')(app);

    app.listen(PORT, () => logger.log(`Listening on port ${PORT}`));
});
