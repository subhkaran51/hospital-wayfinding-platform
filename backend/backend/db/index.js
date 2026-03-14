import pkg from 'pg';
const { Pool } = pkg;
import dotenv from 'dotenv';

dotenv.config();

// Default connection string if running locally without .env
const connectionString = process.env.DATABASE_URL || 'postgresql://postgres:postgres@localhost:5432/campus_nav';

const pool = new Pool({
  connectionString,
});

pool.on('error', (err, client) => {
  console.error('Unexpected error on idle client', err);
  process.exit(-1);
});

export const query = (text, params) => pool.query(text, params);
export default pool;
