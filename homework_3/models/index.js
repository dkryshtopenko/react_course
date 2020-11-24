"use strict";

const Fs = require("fs");
const Path = require("path");
const Sequelize = require("sequelize");
const Settings = require("../db/settings");
const dbSettings = Settings[Settings.env].db;

const sequelize = new Sequelize(
    dbSettings.database,
    dbSettings.user,
    dbSettings.password,
    dbSettings
);

const db = {};

Fs.readdirSync(__dirname)
    .filter(file => file.indexOf(".") !== 0 && file !== "index.js")
    .forEach(file => {
        const model = require(Path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
        db[model.name] = model;
    });

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;