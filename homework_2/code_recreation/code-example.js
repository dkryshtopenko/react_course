// 4
Promise.resolve().then(() => console.log('promise1 resolved'));
// 5
Promise.resolve().then(() => console.log('promise2 resolved'));

Promise.resolve().then(() => {
    // 6
    console.log('promise3 resolved');
    // 9
    process.nextTick(() => console.log('next tick inside promise resolve handler'));
});

// 7
Promise.resolve().then(() => console.log('promise4 resolved'));

// 8
Promise.resolve().then(() => console.log('promise5 resolved'));

// 11
setImmediate(() => console.log('set immediate1'));

// 12
setImmediate(() => console.log('set immediate2'));

// 1
process.nextTick(() => console.log('next tick1'));
// 2
process.nextTick(() => console.log('next tick2'));
// 3
process.nextTick(() => console.log('next tick3'));

// 10
setTimeout(() => console.log('set timeout'), 0);

// 13
setImmediate(() => console.log('set immediate3'));

// 14
setImmediate(() => console.log('set immediate4'));
