/**
 * index.js
 *
 * Created by xiepan on 2016/9/14 10:35.
 */


var server = require("./server");
var router = require("./router");
var requestHandlers = require("./requestHandlers");

var handler = {}
handler["/"] = requestHandlers.indexImage;
handler["/text"] = requestHandlers.indexText;
handler["/start"] = requestHandlers.startPage;
handler["/uploadtext"] = requestHandlers.uploadText;
handler["/uploadimage"] = requestHandlers.uploadImage;
handler["/show"] = requestHandlers.show;

var route = router.route;

server.start(route, handler);