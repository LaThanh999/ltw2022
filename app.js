const express = require('express');
const app = express();
var cors = require('cors');
var morgan = require('morgan');
require('express-async-errors');
require('dotenv').config();

app.use(express.json());
app.use(morgan('dev'));
app.use(cors());

const swaggerUi = require('swagger-ui-express'),
  swaggerDocument = require('./swagger.json');

app.use('/actor', require('./routes/actor.route'));
app.use('/', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// app.get('/', function (req, res) {
//   throw new Error('BROKEN'); // Express will catch this on its own.
// });

app.use(function (req, res, next) {
  res.status(404).json({
    Message: 'Not Found!',
  });
});

app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(500).json({
    Message: 'Something broke!',
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`run server http://localhost:${PORT}`);
});
