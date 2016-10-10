/**
 * express.js
 * http://expressjs.com/zh-cn/guide/writing-middleware.html
 *
 * Created by xiepan on 2016/10/10 10:52.
 */

var express = require('express');
var cookieParser = require('cookie-parser');
const pug = require('pug');

var app = express();

//jade
app.set('view engine', 'jade');

//pug
app.set('view engine', 'pug');
// //编译
// const compiledFunction = pug.compileFile('views/pug_index.pug');
// //渲染
// console.log(compiledFunction({
//     name: 'bigggge'
// }));

//cookieParser
app.use(cookieParser())

// var myLogger = function (req, res, next) {
//     console.log('LOGGER');
//     next();
// };
//
// app.use(myLogger);

var requestTime = function (req, res, next) {
    req.requestTime = Date.now();
    next();
};

app.use(requestTime);

app.get('/', function (req, res) {
    // res.send('Hello World!');
    var responseText = 'Hello World!';
    responseText += 'Request at: ' + req.requestTime + '';
    res.send(responseText);
    console.log(req.cookies);
});

app.get('/jade', function (req, res) {
    res.render('index', {title: 'Hey', message: 'Hello Jade'});
});

app.get('/pug', function (req, res) {
    res.render('index', {title: 'Hey', message: 'Hello Pug'});
});

app.listen(3000);
