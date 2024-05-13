const express = require('express');
//const axios = require('axios');
//const uuid = require('uuid');
//const moment = require('moment');
//const _ = require('lodash');
//const chalk = require('chalk');

const app = express();
const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Servidor en ejecución en http://localhost:${PORT}`);
});