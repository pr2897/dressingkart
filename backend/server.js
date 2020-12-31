const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');

const userRouter = require('./routers/userRouter');
const ProductRouter = require('./routers/productRouter');

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
app.use('/api/v1/products', ProductRouter);

app.use((err, req, res, next) =>
  res.status(500).send({ message: err.message })
);

// RUNNING SERVER

app.listen(5000, () => console.log(`Server up and running on port 5000....`));
