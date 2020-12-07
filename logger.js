// Logger should be an object that wraps console.log methods (log, debug, error, warn)
module.exports = {
    log: (value) => {
        console.log(value);
    },
    debug: (value) => {
        console.debug(value);
    },
    error: (value) => {
        console.error(value);
    },
    warn: (value) => {
        console.warn(value);
    },
}
