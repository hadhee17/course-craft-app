const dotenv = require('dotenv');

const connectDB = require('./config/DB');

const app = require('./app');

dotenv.config({ path: './config/config.env' });

const port = process.env.PORT || 8000;

(async function start() {
  try {
    await connectDB(); // wait for DB connection
    app.listen(port, () => console.log(`app running on port ${port}`));
  } catch (err) {
    console.error('Failed to start server:', err);
    process.exit(1);
  }
})();
