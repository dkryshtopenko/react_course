const http = require('http');
const { PORT } = require('../homework_1/config');
const logger = require('../homework_1/logger');
const { AsyncLocalStorage } = require('async_hooks');

const paramsRegexp = /:[^/]+/g;

const getRouteRegexp = route => new RegExp(`^${route}$`.replace(paramsRegexp, '([^/]+)'));

const storage = new AsyncLocalStorage();

const routes = {
    GET: new Map([
        ['/get-example1', async (req, res) => {
            const { value } = storage.getStore();
            res.end(JSON.stringify({ result: `Hello 1 ${value} success!` }))
        }],
        ['/get-example2', async (req, res) => {
            res.end(JSON.stringify({ result: 'Hello 2 success!' }))
        }],
        ['/get-example3', async (req, res) => {
            res.end(JSON.stringify({ result: 'Hello 3 success!' }))
        }]
    ]),
    POST: new Map([
        ['/post-example', async (req, res) => {
            res.end(JSON.stringify({ result: 'Post success!' }))
        }]
    ])
};

function getRouteParams(matchedRoute, path) {
    const paramNames = ((matchedRoute && matchedRoute.match(paramsRegexp)) || []).map(item => item.substring(1));
    return paramNames.length ? path.match(getRouteRegexp(matchedRoute))
        .slice(1)
        .reduce((res, val, idx) =>
            (Object.assign(res, { [ paramNames[idx] ] : val})), {}) : {};
}

http.createServer(async (req, res) => {
    const [path, queryParams] = req.url.split('?');
    const matchedRoutes = routes[req.method.toUpperCase()];

    const matchedRoute = [...matchedRoutes.keys()]
        .find(route => getRouteRegexp(route).test(path));

    const routeParams = getRouteParams(matchedRoute, path);
    Object.assign(req, { queryParams, routeParams });

    storage.run({
        value: "Test"
    }, async () => {
        try {
            await matchedRoutes.get(matchedRoute)(req, res)
        } catch (e) {
            logger.error(e.toString())
        }
    });

}).listen(PORT, () => logger.log(`Listening on port ${PORT}...`));
