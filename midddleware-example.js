/**
 * midddleware-example.js
 *
 * Created by xiepan on 2016/10/24 16:43.
 */

var express = require('express');
var app = express();


var myLogger = function (req, res, next) {
    console.log('LOGGER');
    next();
};
app.use(myLogger);
app.get('/', function (req, res) {
    res.send('Hello World!');
});

app.listen(3000);