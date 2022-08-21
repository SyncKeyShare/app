const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

let app = express();
app.use(bodyParser.json()).use(cors());


app.listen(8836, () => {
    console.log("http://127.0.0.1:8836")
});

module.exports = {
    post(path, fun) {
        apiFun({method: "post", path, fun});
    },
    get(path, fun) {
        apiFun({method: "get", path, fun});
    },
    del(path, fun) {
        apiFun({method: "delete", path, fun})
    }
}

/**
 *
 * @param config.method
 * @param config.path
 * @param config.fun
 */
function apiFun(config) {
    app[config.method](config.path, (req, res) => {
        config.fun(req, (result) => {
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
            res.json(resultJson);
        });
    });
}






