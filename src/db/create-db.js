const mysql = require('promise-mysql');

module.exports = createPool = async () => {
  pool = await mysql.createPool({
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    // socketPath: `/cloudsql/${process.env.CLOUD_SQL_CONNECTION_NAME}`,
    host: process.env.LOCAL_DB_HOST || 'localhost',
    port: process.env.LOCAL_DB_PORT || 3306,
    connectionLimit: 2,
    connectTimeout: 10000, // 10 seconds
    acquireTimeout: 10000, // 10 seconds
    waitForConnections: true, // Default: true
    queueLimit: 0
  });

  await pool.query(
    `CREATE TABLE IF NOT EXISTS initial_totals (
       user_id VARCHAR(10) NOT NULL COMMENT 'slack user id',
       initial_total INT NOT NULL COMMENT 'base value to calculate user coin total',
     PRIMARY KEY (user_id) );`
  );

  await pool.query(
    `CREATE TABLE IF NOT EXISTS transactions (
       transaction_id INT NOT NULL AUTO_INCREMENT,
       initiator_user_id VARCHAR(10) NOT NULL COMMENT 'slack user id of person giving coins',
       recipient_user_id VARCHAR(10) NOT NULL COMMENT 'slack user id of person taking coins',
       transaction_amt DECIMAL(10, 2) NOT NULL COMMENT 'number of coins changing hands',
       transaction_comment VARCHAR (128) NULL COMMENT 'optional comment on transaction purpose',
     PRIMARY KEY (transaction_id) );`
  );

  return pool;
};
