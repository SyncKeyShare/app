module.exports = {
    initTable(dbRun){
        return dbRun.run("create table if not exists file(file_id INTEGER not null primary key,file_name TEXT,file_content TEXT)");
    },
    getTotal(dbRun) {
        return dbRun.get("select count(*) as count from file");
    },
    getPage(dbRun, thisPage, pageSize) {
        if ((isNaN(parseInt(pageSize)) || parseInt(pageSize) < 0)) {
            pageSize = 20;
        }
        if ((isNaN(parseInt(thisPage)) || parseInt(thisPage) < 0)) {
            thisPage = 1;
        }
        let start = (thisPage - 1) * pageSize;
        return dbRun.all("select file_id,file_name,file_content from file limit ?,?", [start, pageSize]);
    },
    findById(dbRun, file) {
        return dbRun.all("select * from file where  file_id = ?", file.file_id);
    },
    removeFile(dbRun, file) {
        return dbRun.run("delete from file where file_id = ?", file.file_id);
    },
    addFile(dbRun, file) {
        return dbRun.run("insert into file(file_id,file_name, file_content) values (?,?,?)",
            [null, file.file_name, file.file_content]);
    }
}