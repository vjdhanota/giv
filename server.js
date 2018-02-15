const express = require('express');

const app = express();
const models = require('./models');

app.get('/user', (req, res, next) => {
  models.User.findAll().then(user => res.send(user));
});

app.get('/api/hello', (req, res) => {
  res.send({ express: 'Hello From Express' });
});

// Listen to port 5000
app.listen(5000, () => {
  console.log('Dev app listening on port 3000!');
});

module.exports = app;
