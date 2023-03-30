const express = require('express');
const app = express();
const cors = require('cors');
const { connection } = require('./config/db');
const { taskControl } = require('./routes/task.router');
const { emailControler } = require('./routes/email.router');

const port = process.env.PORT || 8080;
require('dotenv').config();
app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
  res.send('Welcome my server');
});

app.use('/task', taskControl);
app.use('/email', emailControler);

app.listen(port, async () => {
  try {
    await connection;
    console.log('Connected to Database');
  } catch (error) {
    console.log(error);
    console.log('Not connected');
  }
  console.log(`Listning at PORT ${port}`);
});
