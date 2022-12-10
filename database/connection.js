const pg = require("pg");
const dotenv = require("dotenv");
dotenv.config();
const connectionString = process.env.DATABASE_URL;
const db = new pg.Pool({ connectionString });
db.query("SELECT * FROM reviews").then((result) => console.log(result.rows));
db.query("SELECT * FROM users").then((result) => console.log(result.rows));
module.exports = db;

//-----------------------------------------------
// const pg = require('pg');
// require('dotenv').config();
// const { Pool } = require('pg');

// const isProduction = process.env.NODE_ENV === 'production';
// const connectionString = `postgresql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_DATABASE}`;
// console.log(connectionString);
// const pool = new Pool({
//   connectionString: isProduction ? process.env.DATABASE_URL : connectionString,
// });

// module.exports = { pool };


//---------------------------------------------------

// const fs = require('fs');
// const path = require('path');
// const db = require('./dbConfig.js');

// // get the contents of our init.sql file
// const initPath = path.join(__dirname, 'init.sql');
// const initSQL = fs.readFileSync(initPath, 'utf-8');

// // run the init.sql file on our database
// db.query(initSQL)
//   .then(() => {
//     console.log('Database built');
//     db.end(); // close the connection as we're finished
//   })
//   .catch(console.log);

