const express = require('express');
const rootRout = require('./src/routers');

const app = express();

// Root routs
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use('/api', rootRout);

module.exports = app;