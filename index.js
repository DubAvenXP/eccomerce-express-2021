const express = require('express');
const app = express();
const cors = require('cors');

const { errorHandler, logErrors, boomErrorHandler, ormErrorHandler } = require('./middlewares/error.handler');
const routerApi = require('./routes/index');
const port = 3000;

app.use(express.json());

const whitelist = ['http://localhost:3000', 'http://localhost:3001'];

const options = {
  origin: (origin, callback) => {
    if (whitelist.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
};

// app.use(cors(options));
app.use(cors(options));

routerApi(app);

app.use(logErrors);
app.use(ormErrorHandler);
app.use(boomErrorHandler);
app.use(errorHandler);


app.listen(port, () => console.log(`Example app listening on port ${port}!`));
