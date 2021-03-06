/**
 * server.js
 *
 * Created by xiepan on 2016/9/13 17:38.
 */

var http = require('http');
var url = require('url');

function start(route, handle) {
    http.createServer(function (request, response) {
            var postData = "";
            var pathname = url.parse(request.url).pathname;
            if (pathname === '/favicon.ico') return;
            console.log("Request for " + pathname + " received.");

            if (pathname === '/uploadtext') {
                request.setEncoding("utf-8");
                request.addListener("data", function (postDataChunk) {
                    postData += postDataChunk;
                    console.log("Received POST data chunk " + postDataChunk + ".");
                });
                request.addListener("end", function () {
                    route(handle, pathname, response, postData, request);
                });
            }
            else {
                route(handle, pathname, response, postData, request);
            }
        }
    ).listen(8888);
    console.log("Server has started.");
}

exports.start = start;