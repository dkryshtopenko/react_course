const PORT = 8001;
let ws;

function connectToServer() {
    ws = new WebSocket(`ws://localhost:${PORT}`);
    ws.onmessage = evt => console.dir(evt.data);
    ws.onopen = () => console.log("Connected.");
    ws.onclose = (e) => console.dir(e);
}

function sendFile() {
    ws.binaryType = "arraybuffer";
    const file = document.getElementById('filename').files[0];
    const reader = new FileReader();
    reader.onloadend = () => ws.send(reader.result);
    reader.readAsArrayBuffer(file);
}