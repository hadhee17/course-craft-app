const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config({ path: './config/config.env' });

const DB = process.env.DATA_BASE.replace(
  '<db_password>',
  process.env.DATABASE_PASSWORD,
);

const connectDB = async () => {
  try {
    const conn = mongoose.connect(DB);
    const con = await conn;

    console.log(`✅ MongoDB connected: ${con.connection.host}`);
  } catch (err) {
    console.error(`❌ Error: ${err.message}`);
    process.exit(1); // Exit on failure
  }
};

module.exports = connectDB;
