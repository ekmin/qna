const mysql = require("mysql2/promise");

async function query(sql, params) {
  const connection = await mysql.createConnection(process.env.DATABASE_URL);
  const [results] = await connection.execute(sql, params);

  return results;
}

module.exports = {
  query,
};