const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require("path");
const session = require('express-session');
app.use(express.static(path.join(__dirname, '/public')));
app.set('views', __dirname + '/views');
app.use(bodyParser.urlencoded({ extended: false }));
