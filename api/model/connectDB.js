const PG = require('pg');
require('dotenv').config();

const CLIENT = new PG.Client({
  user     : process.env.PGUSER,
  host     : process.env.PGHOST,
  password : process.env.PGPASSWORD,
  port     : process.env.PGPORT,
  database : process.env.PGDB
});

CLIENT.connect();

module.exports = CLIENT;