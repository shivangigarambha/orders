const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const db = require('./app/models');

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

require('./app/routes/admin')(app);
require('./app/routes/customers')(app);
require('./app/routes/products')(app);

app.use((err, req, res, next) => {
  const errCode = err.code || 500;
  const message = err.message || 'Something went wrong';
  res.status(errCode).json({ error: message });
});

db.sequelize.sync();

const PORT = 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});