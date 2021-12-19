const express = require('express');
const config = require('config');
const mongoose = require('mongoose');

const app = express();

app.use(express.json({ extended: true }));
app.use('/auth', require('./routes/auth.routes'));
app.use('/users', require('./routes/users.routes'));
app.use('/profile', require('./routes/info.routes'));

const PORT = config.get('port') || 5000;

const start = async () => {
  try {
    await mongoose.connect(config.get('mongoUrl'), {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    app.listen(PORT, () =>
      console.log(`Server has been started on port: ${PORT}`)
    );
  } catch (e) {
    console.log('Server Error', e.message);
    process.exit(1);
  }
};

start().then();
