const Fibonacci = (n) => (n === 0 || n === 1) ? n : Fibonacci(n-2) + Fibonacci(n-1)

process.on('message', (msg) => {
    console.log('CHILD got message:', msg);
    process.send(Fibonacci(msg));
});

