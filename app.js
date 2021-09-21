const express = require('express');
const config = require('config');
const mongoose = require('mongoose');

const app = express();

app.use('/api/auth', require('./server/routes/auth.route'));

const PORT = config.get('port')  || 5000;

async function start() {
  try {
    await mongoose.connect(config.get('microgreenDB'), {
      useUnifiedTopology: true,
      autoIndex: true
    });
  } catch(e) {
    console.log('Server Error', e.message);
    process.exit(1);
  }
}

start();

app.listen(PORT, () => console.log(`App has been started on port ${PORT}...`));
