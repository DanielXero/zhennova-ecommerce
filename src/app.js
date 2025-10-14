const express = require('express')
const app = express()


app.get('/', (req, res) => {
  res.send('¡Bienvenido a Zhennova API!');
});


module.exports = app