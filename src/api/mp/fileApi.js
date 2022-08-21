const api = require("../app");
const FileP = require("../../pojo/fileP")
let runDb = require('../../database/runDb');
let fileSql = require('../../database/mp/fileSql');

/**
 * 分页查询
 */
api.get("/file/page/", (req, fun) => {
    runDb({
        success: (dbRun, close) => {
            let thisPage = req.query.thisPage;
            let pageSize = req.query.pageSize;
            fileSql.getPage(dbRun, thisPage, pageSize).then(data => {
                fileSql.getTotal(dbRun).then(total => {
                    fun({data: {total: total.count, records: data}});
                    close();
                })
            })


        }
    })
})

/**
 * 根据id查询
 */
api.get("/file/:id",
    (req, fun) => {
        let fileP = new FileP();
        fileP.file_id = req.params.id;
        runDb({
            success(dbRun, close) {
                fileSql.findById(dbRun, fileP).then(data => {
                    fun({data: data});
                    close()
                })
            }
        })
    })

/**
 * 添加
 */
api.post("/file/add/", (req, fun) => {
    let body = req.body;
    runDb({
        success(dbRun, close) {
            let fileP = new FileP();
            fileP.file_name = body.file_name;
            fileP.file_content = body.file_content;
            fileSql.addFile(dbRun, fileP).then(result => {
                if (result.changes === 1) {
                    fun("ok");
                } else {
                    fun({err: true, message: "错误"});
                }
                close();
            });
        }
    })
})
/**
 * 删除
 */
api.del("/file/del/:id", (req, fun) => {
    let fileP = new FileP();
    fileP.file_id = req.params.id;

    runDb({
        success(dbRun, close) {
            fileSql.removeFile(dbRun, fileP).then((result) => {
                if (result.changes === 1) {
                    fun("ok");
                } else {
                    fun({err: true, message: "错误"});
                }
                close();
            })
        }
    })
})