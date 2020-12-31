const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');

const userRouter = require('./routers/userRouter');
const products = require('./data');

const app = express();

//DB CONNECTION

mongoose
  .connect(
    'mongodb+srv://root-user:root-user@cluster0.wypqc.mongodb.net/amazona?retryWrites=true&w=majority',
    { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true }
  )
  .then(() => console.log(`DB connected...`))
  .catch((er) => console.log(er));

// MIDDLEWARES

app.use(morgan('tiny'));

// ROUTERS
app.use('/api/v1/users/', userRouter);

app.get('/api/v1/products', (req, res) => {
  res.send({ products });
});

app.get('/api/v1/product/:id', (req, res) => {
  const { id } = req.params;

  const product = products.products.find((el) => el._id === id * 1);
  if (!product) return res.status(404).send({ error: 'No Product Found' });
  res.send({ product });
});

app.use((err, req, res, next) =>
  res.status(500).send({ message: err.message })
);

// RUNNING SERVER

app.listen(5000, () => console.log(`Server up and running on port 5000....`));
