require("dotenv").config();

class Constants{
    mysqlQuiz(){
        return {
            host: "localhost",
            user: "root",
            password: "12345",
            database: "quiz",
            port: 3306,
        }
    }
}

module.exports=Constants;