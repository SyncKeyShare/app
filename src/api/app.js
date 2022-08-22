const fastify = require("fastify")({
    logger: true,
});

// Run the server and report out to the logs
fastify.listen(
    {port: 8863, host: "0.0.0.0"},
    // { port: process.env.PORT, host: "0.0.0.0" },
    function (err, address) {
        if (err) {
            fastify.log.error(err);
            process.exit(1);
        }
        console.log(`Your app is listening on ${address}`);
        fastify.log.info(`server listening on ${address}`);
    }
);
module.exports = {
    post(path, fun) {
        apiFun({method: "post", path, fun});
    },
    get(path, fun) {
        apiFun({method: "get", path, fun});
    },
    del(path, fun) {
        apiFun({method: "delete", path, fun})
    },
    options(path, fun) {
        apiFun({method: "options", path, fun})
    }
}

/**
 *
 * @param config.method
 * @param config.path
 * @param config.fun
 */
function apiFun(config) {

    fastify[config.method](config.path, (req, res) => {
        config.fun(req, (result) => {
            res.headers({
                "Access-Control-Allow-Origin": "*",
                // "Content-Type": "application/json;charset=UTF-8",
                "Access-Control-Allow-Headers": "token,Content-Type",
                "Access-Control-Allow-Methods": "*"
            })
            // if (config.method==="options") return;

            let resultJson = {
                data: {},
                success: true,
                message: "ok",
                code: 100
            }
            if (result.err) {
                resultJson.success = false;
                resultJson.message = result.message;
                resultJson.code = 500;
            } else {
                if (typeof result === "string") {
                    resultJson.message = result;
                } else {
                    resultJson.message = result.message ? result.message : "ok";
                    resultJson.data = result.data;
                }
            }
            res.send(JSON.stringify(resultJson));
        });
    });
}






