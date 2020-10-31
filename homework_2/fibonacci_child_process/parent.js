const { fork } = require('child_process');

const myFork = fork(`${__dirname}/child.js`);

myFork.on('message', (msg) => {
    console.log('Calculated Fibonacci:', msg);
});

for(let i = 0; i < 5; i++) {
    myFork.send(i);
}

/*
    CHILD got message: 0
    CHILD got message: 1
    CHILD got message: 2
    CHILD got message: 3
    CHILD got message: 4
    Calculated Fibonacci: 0
    Calculated Fibonacci: 1
    Calculated Fibonacci: 1
    Calculated Fibonacci: 2
    Calculated Fibonacci: 3
* */

// shutdown in 2 sec
setTimeout(() => myFork.kill(), 2 * 1000)
