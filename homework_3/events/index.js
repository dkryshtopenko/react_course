const { Event } = require("../models/");
const { Op } = require("sequelize");

// --- --- --- --- --- --- --- Handlers --- --- --- --- --- --- --- ---

getEvents = async(req, res) => {
    const location = req.query.location;

    let events = await Event.findAll();

    if (location)
        events = events.filter(event => event.location === location);

    res.json(events);
}

getEventById = async(req, res) => {
    const id = Number(req.params.id);
    const event = await Event.findByPk(id);
    if (event === null) {
        res.json({ status: `Not found by ID ${id}`, entity: null })
    } else {
        res.json({ status: 'OK', entity: event })
    }
}

removeEvent = async(req, res) => {
    const id = Number(req.params.id);
    const options = {
        where: {
            id: {
                [Op.eq]: id,
            }
        }
    };
    Event.destroy(options).then((rowDeleted) => { // rowDeleted will return number of rows deleted
        if(rowDeleted === 1){
            res.json({ status: 'OK', entity: null })
        } else {
            res.json({ status: `Not found by ID ${id}`, entity: null })
        }
    });
}

insertEvent = async(req, res) => {
    const { title, location } = req.body;
    const event = await Event.create({ title, location, date: new Date()});
    res.json({ status: 'OK', entity: event })
};

updateEvent = async(req, res) => {
    const id = Number(req.params.id);
    const { title, location } = req.body;

    const options = {
        where: {
            id: {
                [Op.eq]: id,
            }
        }
    };
    await Event.update({ title, location }, options);
    const event = await Event.findByPk(id);

    res.json({ status: 'OK', entity: event })
}

module.exports = {
    getEvents,
    getEventById,
    removeEvent,
    insertEvent,
    updateEvent,
};

