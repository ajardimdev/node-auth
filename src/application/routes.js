const routes = require("express").Router();
const publicRouter = require("./public.routes");
const privateRouter = require("./private.routes");

publicRouter(routes);
privateRouter(routes);

module.exports = routes;
