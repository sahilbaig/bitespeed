const { Pool } = require('pg');
require('dotenv').config();



const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: 'bs_assign',
    password: process.env.DB_PASSWORD,
    port: 5432,
    ssl: {
        rejectUnauthorized: false
    }
});

const createUsersTable = async () => {
    const client = await pool.connect();
    try {
        await client.query(`
            CREATE TABLE IF NOT EXISTS users (
                id SERIAL PRIMARY KEY,
                username VARCHAR(50) UNIQUE NOT NULL,
                email VARCHAR(100) UNIQUE NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `);
        console.log('Table "users" created successfully');
    } finally {
        client.release();
    }
};

const query = async (queryString, params = []) => {
  const client = await pool.connect();
  try {
      const result = await client.query(queryString, params);
      return result.rows;
  } finally {
      client.release();
  }
};

module.exports = {
    pool,
    createUsersTable,
    query
};
