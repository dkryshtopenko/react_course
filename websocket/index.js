const WebSocketServer = require('websocket').server;
const http = require('http');
const Clients = require('./clients');
const fs = require("fs");
const path = require("path");
const { v4 } = require('uuid');
const { PORT } = require('../config');

const clients = new Clients();

const server = http
    .createServer((req, res) => res.writeHead(404).end())
    .listen(PORT, () => console.log('Server is up and running'));

const webSocketConfig = {
    httpServer: server,
    autoAcceptConnections: true
};

const webSocketServer = new WebSocketServer(webSocketConfig); // webSocketServer

originIsAllowed = (origin) => true; // originIsAllowed

webSocketServer.on('request', (req) => {
    if (!originIsAllowed(req.origin)) {
        req.reject();
        console.log((new Date()) + ' Connection from origin ' + req.origin + ' rejected.');
        return;
    } // if
    const conn = req.accept(null, req.origin);
    clients.add(conn);
    conn.on('message', async msg => {
        switch (msg.type) {
            case "utf8":
                conn.sendUTF(msg.utf8Data);
                break;
            case "binary":
                try {
                    const fileName = v4();
                    const filePath = path.join(__dirname, 'data', fileName);
                    await fs.writeFile(filePath, msg.binaryData, 'binary',
                        (err) => console.error('Error: ', err));
                    clients.getAll().forEach(client => client.sendUTF('file:///' + filePath))
                } catch (e) {
                    console.log(e);
                } // try-catch
                break;
        }
    }); // on
}); // on