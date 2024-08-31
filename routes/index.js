const express = require('express');
const v1Router = require('./v1/index.js');
const itemRouter = require('./v1/itemRoutes.js');


const apiRouter = express.Router();

apiRouter.use('/v1',v1Router)
apiRouter.get("/", (req, res) => {
    res.send("Hello World!");
  });
module.exports = apiRouter