'use strict';
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const morgan = require('morgan');
const mongoose = require('mongoose');
const debug = require('debug')('cfgram:server');
const Promise = require('bluebird');

mongoose.Promise = Promise;

const bearerRouter = require('./route/album-router.js');
const authRouter = require('./route/auth-router.js');
const picRouter = require('./route/pic-router.js');
const errors = require('./lib/error-middleware.js');


dotenv.load();

const PORT = process.env.PORT;
const app = express();
mongoose.connect(process.env.MONGODB_URI);
app.use(cors());
app.use(morgan('dev'));
app.use(authRouter);
app.use(bearerRouter);
app.use(picRouter);
app.use(errors);

const server = module.exports = app.listen(PORT, () => {
  debug(`server up: ${PORT}`);
});
