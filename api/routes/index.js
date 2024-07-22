var routes = require("require-dir")(".", { recurse: true });

function addroutes(app, nestedRoutes, nestedRouteFolder) {
    Object.keys(nestedRoutes).forEach(function (routeName) {
        app.use(
            "/priceData/" + nestedRouteFolder + "/" + routeName.split(".")[0],
            require("./" +  nestedRouteFolder + "/" +routeName)
        );
    });
}

module.exports = (app) => {
    Object.keys(routes).forEach(function (routeName) {
        typeof routes[routeName] === "function"
            ? app.use("/priceData/" + routeName.split(".")[0], require("./" + routeName))
            : addroutes(app, routes[routeName], routeName);
    });
};