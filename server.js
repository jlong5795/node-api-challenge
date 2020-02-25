const express = require('express');
const helmet = require('helmet');

const projectRouter = require('./data/routers/projectRouter.js');
const actionRouter = require('./data/routers/actionRouter.js');

const server = express();

server.use(express.json());
server.use(helmet());

server.use("/api/projects", logger, projectRouter);
server.use("/api/actions", logger,  actionRouter);


server.get('/', logger, (req, res) => {
  res.send(`<h2>I wrote this in a sprint challenge!</h2>`);
});

//custom middleware

function logger(req, res, next) {
  console.log(`[${new Date().toISOString()}] ${req.method} to ${req.url}`);
  next();
};

module.exports = server;