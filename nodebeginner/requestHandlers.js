/**
 * requestHandlers.js
 *
 * Created by xiepan on 2016/9/30 14:09.
 */

var exec = require("child_process").exec;
var queryString = require("querystring"),
    fs = require("fs"),
    formidable = require("formidable");


function indexText(response) {
    console.log("Request handler 'startPage' was called.");

    var body = '<html>' +
        '<head>' +
        '<meta http-equiv="Content-Type" content="text/html; ' +
        'charset=UTF-8" />' +
        '</head>' +
        '<body>' +
        '<form action="/uploadtext" method="post">' +
        '<textarea name="text" rows="20" cols="60"></textarea>' +
        '<input type="submit" value="Submit text" />' +
        '</form>' +
        '</body>' +
        '</html>';

    response.writeHead(200, {"Content-Type": "text/html"});
    response.write(body);
    response.end();
}

function indexImage(response) {
    console.log("Request handler 'start' was called.");

    var body = '<html>' +
        '<head>' +
        '<meta http-equiv="Content-Type" ' +
        'content="text/html; charset=UTF-8" />' +
        '</head>' +
        '<body>' +
        '<form action="/uploadimage" enctype="multipart/form-data" ' +
        'method="post">' +
        '<input type="file" name="upload">' +
        '<input type="submit" value="Upload file" />' +
        '</form>' +
        '<form action="/uploadtext" method="post">' +
        '<textarea name="text" rows="20" cols="60"></textarea>' +
        '<input type="submit" value="Submit text" />' +
        '</form>' +
        '</body>' +
        '</html>';

    response.writeHead(200, {"Content-Type": "text/html"});
    response.write(body);
    response.end();
}

function startPage(response, postData) {
    console.log("Request handler 'startPage' was called.");

    //非阻塞操作exec
    exec("find /", {timeout: 1000, maxBuffer: 20000 * 1024},
        function (err, stdout, stderr) {
            response.writeHead(200, {"Content-Type": "text/plain"});
            response.write(stdout);
            response.end();
        })

    return "Hello Start";
}

function uploadText(response, postData, request) {
    console.log("Request handler 'upload' was called.");
    response.writeHead(200, {"Content-Type": "text/plain"});
    response.write("You've sent: " + queryString.parse(postData).text);
    response.end();
}

function uploadImage(response, postData, request) {
    console.log("Request handler 'upload2' was called.");
    var form = new formidable.IncomingForm();
    form.parse(request, function (error, fields, files) {
        console.log("parsing done");
        fs.renameSync(files.upload.path, "tmp/test.jpg");
        response.writeHead(200, {"Content-Type": "text/html"});
        response.write("received image:<br/>");
        response.write("<img src='/show'/>");
        response.end();


    })
}

function show(response, postData) {
    console.log("Request handler 'show' was called.");
    fs.readFile("tmp/test.jpg", "binary", function (error, file) {
        if (error) {
            response.writeHead(500, {"Content-Type": "text/plain"});
            response.write(error + "\n");
            response.end();
        } else {
            response.writeHead(200, {"Content-Type": "image/png"});
            response.write(file, "binary");
            response.end();
        }
    })
}

exports.indexText = indexText;
exports.indexImage = indexImage;
exports.startPage = startPage;
exports.uploadText = uploadText;
exports.uploadImage = uploadImage;
exports.show = show;