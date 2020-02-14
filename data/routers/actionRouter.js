const express = require('express');
const Actions = require('../helpers/actionModel.js');
const Projects = require('../helpers/projectModel.js');
const router = express.Router();

router.get('/', (req, res) => {
  res.send(`<h2>I wrote this in a sprint challenge!</h2>`);
});


module.exports = router;