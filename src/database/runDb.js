const dbFile = "./.data/choices.db";
const sqlite3 = require("sqlite3").verbose();
const dbWrapper = require("sqlite");

/**
 *
 * @param parameter.success(db)
 * @param parameter.closed()
 * @param parameter.err(err)
 */
module.exports =
    function runDb(parameter) {
        dbWrapper
            .open({
                filename: dbFile,
                driver: sqlite3.Database
            }).then(async db => {

            function close() {
                db.close().then(() => {
                        parameter.closed ? parameter.closed() : "";
                    }
                )
            }

            parameter.success(db, close);

        }).catch(err => parameter.err ? parameter.err(err) : console.error(err));
    }