const express = require('express');
const connectDB = require('./database/database');
const { UserRoute } = require('./routes');

const app = express();

app.use(express.json());

connectDB();

app.use('/users', UserRoute);

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
