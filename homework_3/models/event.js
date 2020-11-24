const Moment = require("moment");

module.exports = (sequelize, DataTypes) => {
    const Event = sequelize.define("Event", {
        title: DataTypes.STRING,
        location: DataTypes.STRING,
        date: {
            type: DataTypes.DATE,
            get: function() {
                return Moment(this.getDataValue("date")).format("MMMM Do, YYYY");
            }
        },
    });

    return Event;
};