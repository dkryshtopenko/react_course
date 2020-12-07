const { v4 } = require('uuid');

class Clients {
    clients = {};

    add(connection) {
        const id = v4();
        this.clients[id] = connection;
        connection.id = id;
        connection.on('close', this.remove.bind(this, connection));
    }

    remove(conn) {
        delete this.clients[conn.id];
    }

    getAll() {
        return Object.values(this.clients);
    }
}

module.exports = Clients;