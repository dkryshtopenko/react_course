const stream = require('stream');
const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');

// --- --- --- --- --- --- --- Handlers --- --- --- --- --- --- --- ---

getAll = async(req, res) => readEvents().then(events => {
    const streamEvents = stream.Readable.from(JSON.stringify(events));
    streamEvents.pipe(res);
});

getEvents = async(req, res) => {
    const location = req.query.location;
    readEvents().then(events => {
        if (location)
            events = events.filter(event => event.location === location);
        res.json(events);
    });
}

getEvent = async(req, res) => {
    const id = Number(req.params.id);
    if (Number.isInteger(id)) {
        readEvents().then(events => res.json(events[id]));
    } else {
        res.json({ error: 'invalid param' });
    }
}

remove = async(req, res) => {
    const id = Number(req.params.id);
    if (Number.isInteger(id)) {
        readEvents().then(events => {
            events = events.filter((e) => Number(e.id) !== id)
            updateFile(events);
            res.json({ success: true });
        });
    } else {
        res.json({error: 'Invalid ID param'});
    }
}

insert = async(req, res) => {
    const { title, location, date, hour } = req.body;
    readEvents().then(events => {
        // Generate unique ID
        events.push({id : events.length + 1, title, location, date, hour}); // update memory
        updateFile(events); // update file
        res.json([{ result: 'Event was added' }])
    });
}

update = async(req, res) => {
    const { title, location, date, hour } = req.body;
    const id = Number(req.params.id);

    readEvents().then(events => {
        let event = events.find((e) => Number(e.id) === id)
        if (event) {
            event = { id, title, location, date, hour };
            events = events.filter((e) => Number(e.id) !== id)
            events.push(event);
            updateFile(events);
            res.json([{ result: 'Event was updated' }])
        } else {
            res.json({ error: 'Event not found' });
        }
    });
}

const sourcePath = path.join(__dirname, '..', 'data', 'events.csv');

readEvents = () => {
    let events = [];
    return new Promise((resolve) => {
        fs.createReadStream(sourcePath)
            .pipe(csv(['id', 'title', 'location', 'date', 'hour']))
            .on('data', data => events.push(data))
            .on('end', () => resolve(events));
    });
}

convertToCSV = (events) => events.reduce((_, e) =>
        (_.concat(`${[e.id, e.title, e.location, e.date, e.hour].join(',')}\n`)), '')

updateFile = (events) => fs.writeFileSync(sourcePath, convertToCSV(events))

module.exports = {
    getEvents,
    getEvent,
    remove,
    insert,
    update,
    getAll
};

