const mysql = require('mysql');
const conn = {
    host: 'localhost',
    port: '3306',
    user: 'GGAME',
    password: 'GGAME',
    database: 'ggame'
}

module.exports = {
    init : function(){
        return mysql.createConnection(conn);
    },
    connect: function(connection){
        connection.connect(function(error){
            if(error) console.log('mysql connection error : ', error)
            else console.log('mysql is connection successfully!')
        })
    }
}