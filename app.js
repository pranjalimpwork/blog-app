const express = require('express');
const connectDB = require('./database/database');
const { UserRoute, AuthRoutes } = require('./routes');
const dotenv = require('dotenv');
dotenv.config();

const port = process.env.PORT || 5050;
const MONGO_URL = process.env.MONGO_URL;

const app = express();

app.use(express.json());

connectDB();

app.use('/users', UserRoute);
app.use('/auth', AuthRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  // console.log(`connected in ${MONGO_URL}`);
});
