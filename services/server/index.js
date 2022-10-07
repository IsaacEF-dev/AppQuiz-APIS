const path=require("path");
const glob=require("glob");

module.exports=(app)=>{
    glob.sync('./services/server/*.js').forEach(file=>{
        if(!file.includes("index.js")) require(path.resolve(file))(app);
    })
}