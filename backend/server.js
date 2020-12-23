const express = require('express');
const morgan = require('morgan');

const products = require('./data');

const app = express();
app.use(morgan('tiny'));

app.get('/api/v1/products', (req, res) => {
  res.send({ products });
});

app.get('/api/v1/product/:id', (req, res) => {
  const { id } = req.params;

  const product = products.products.find((el) => el._id === id * 1);
  if (!product) return res.status(404).send({ error: 'No Product Found' });
  // console.log(product);
  res.send({ product });
});

app.listen(5000, () => console.log(`Server up and running on port 5000....`));
