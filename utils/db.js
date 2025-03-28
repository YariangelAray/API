import mysql from "mysql2/promise"

const connection = await mysql.createConnection({
  host: "localhost",
  user: "yariangel_adso2894667",
  password: "0421",
  database: "node_adso2894667"
});

export default connection;