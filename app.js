// App should require config and logger.
const
    http = require('http'),
    config = require("./config"),
    logger = require("./logger")

// Env should be passed through as cli argument
const cliOptions = config.getCliOptions();
logger.log(cliOptions.length ? cliOptions : "No CLI args weren't provided ...")

// Port should come from env vars
const port = process.env.PORT || config.PORT // by default is 3000

// App should run dumb server which logs hello world on each request (can be found on slide 7) ​
http
    .createServer((req, res) =>
        res
            .writeHead(200, { 'Content-Type': 'application/json' })
            .end('hello world')
    ).listen(Number(port), () => logger.log(`Listening on port ${port}...`));
