const pg = require('pg');

const config = require('./config');

const pool = new pg.Pool({
  connectionString: config.DATABASE_URL,
  ssl: false
});

module.exports = pool;