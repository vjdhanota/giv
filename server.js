const express = require('express');

const app = express();
const models = require('./models');

app.get('/', (req, res, next) => {
  models.Subscriptions.findAll().then((sub) => {
    console.log(sub);
  });
});

// Listen to port 5000
app.listen(3000, () => {
  console.log('Dev app listening on port 3000!');
});

module.exports = app;
