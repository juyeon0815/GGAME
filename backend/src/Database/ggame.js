const mysql = require("mysql");
const conn = {
  host: "3.38.102.40",
  port: "3306",
  user: "root",
  password: "ggame",
  database: "ggame",
};

module.exports = {
  init: function () {
    return mysql.createConnection(conn);
  },
  connect: function (connection) {
    connection.connect(function (error) {
      if (error) console.log("mysql connection error : ", error);
      else console.log("mysql is connection successfully!");
    });
  },
};
