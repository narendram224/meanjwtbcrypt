const express = require('express')
const app = express()

const bookRouters = require('./api/router/book');
const userRouter = require('./api/router/users');

const bodyParser = require('body-parser');
const mongoose = require('mongoose');


mongoose.connect('mongodb://root:root@cluster0-shard-00-00-h3pvo.mongodb.net:27017,cluster0-shard-00-01-h3pvo.mongodb.net:27017,cluster0-shard-00-02-h3pvo.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true');

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());