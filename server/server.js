const dotenv = require('dotenv');

const connectDB = require('./config/DB');

const app = require('./app');

dotenv.config({ path: './config/config.env' });

const port = process.env.PORT || 8000;

const connectToDB = async () => {
  await connectDB();
};
connectToDB();

app.listen(port, () => console.log(`app running in port ${port}`));
