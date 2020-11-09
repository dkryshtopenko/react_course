setTimeout(() => console.log('timeout1'));

setImmediate(() => {
    console.log('timeout2')
    Promise.resolve().then(() => {
        console.log('promise resolve')
    });
});

process.nextTick(() => console.log("timeout 3"))
