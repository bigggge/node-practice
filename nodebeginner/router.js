/**
 * router.js
 *
 * Created by xiepan on 2016/9/14 10:38.
 */

// ->server.js
function route(handle, pathname, response, postData, request) {
    console.log("About to route a request for " + pathname);
    if (typeof handle[pathname] === 'function') {
        return handle[pathname](response, postData, request);
    } else {
        console.log("No request handler found for " + pathname);
        response.writeHead(404, {"Content-Type": "text/plain"});
        response.write("404 Not found");
        response.end();
    }
}

exports.route = route;