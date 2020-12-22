const express = require('express');

const products = require('./data');

const app = express();

app.get('/api/v1/products', (req, res) => {
  res.send({ products });
});

app.listen(5000, () => console.log(`Server up and running on port 5000....`));
