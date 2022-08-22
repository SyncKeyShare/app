let api = require("../app");

api.get("/",(req,fun)=>{fun("buy");})

api.options("/*",(req,fun)=>{
    fun("")
});
