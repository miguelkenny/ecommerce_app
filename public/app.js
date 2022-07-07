const express = require('express')
const routes = require('./server/router/routes');

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', routes);

app.listen(PORT, console.log(`Server started on port ${PORT}`));