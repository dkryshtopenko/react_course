// App should require config and logger.
const http = require('http');
const config = require("./config")
const logger = require("./logger")

// Env should be passed through as cli argument
const cliOptions = []
const myArgs = process.argv.slice(2);

myArgs.map((arg) => {
    const options = arg.slice(1).split("=");
    cliOptions.push({
        name: options[0],
        value: options[1],
    })
})

logger.log(cliOptions.length ? cliOptions : "No CLI args weren't provided ...")

// Port should come from env vars
const port = process.env.PORT || config.PORT // by default is 3000

// App should run dumb server which logs hello world on each request (can be found on slide 7) ​
http.createServer((req, res) =>
    res
        .writeHeader(200, { 'Content-Type': 'application/json' })
        .end('hello world')
).listen(port, () => logger.log(`Listening on port ${port}...`));
