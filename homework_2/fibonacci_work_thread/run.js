const http = require('http');
const { Worker, isMainThread, parentPort, workerData } = require('worker_threads');

const Fibonacci = (n) => (n === 0 || n === 1) ? n : Fibonacci(n-2) + Fibonacci(n-1)

const Random = (min, max) => Math.floor(min + Math.random() * (max + 1 - min))

if (isMainThread) {
    http.createServer((req, res) => {
        const workerData = Random(0, 15);
        console.log(`START: Counting Fibonacci for ${workerData} ...`);
        const start = new Date();
        const worker = new Worker(__filename, { workerData });

        worker.on('message', (msg) => {
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(`FINISH: Fibonacci for ${workerData} is ${msg} (${(new Date - start)/1000} sec)`);
        });

    }).listen(3000, () => console.log('Listening on port 3000'));
} else {
    parentPort.postMessage(Fibonacci(workerData));
}