const express = require('express');
const axios = require('axios');
const uuid = require('uuid');
const moment = require('moment');
const _ = require('lodash');
const chalk = require('chalk');

const app = express();
const PORT = 3000;
//Creamos let users para guardar los uarios recibidos por axios;
let users = [];

const obtenerUsuario = async (req, res, next) => {
  try {
    const response = await axios.get('https://randomuser.me/api/');
    const userData = response.data.results[0];
    const { name, gender } = userData;
    const newUser = {         
      id: uuid.v4(),
      timestamp: moment().format('YYYY-MM-DD HH:mm:ss'),    
      name: `${name.first} ${name.last}`,
      gender,       
    };
    users.push(newUser);    
    req.newUser = newUser;    
    next();
  } catch (error) {
    console.error('Error al obtener datos del usuario:', error);
    throw error;
  }
};

app.get('/nuevoUsuario', obtenerUsuario, (req,res) => {
  res.status(201).json(req.newUser);
})

app.get('/usuarios', (req,res) => {
  console.log(chalk.bgWhite.blue('Usuarios registrados:'));  
  users.forEach(user=>{
    console.log(chalk.bgWhite.blue(`ID: ${user.id}`));
    console.log(chalk.bgWhite.blue(`Nombre: ${user.name}`));
    console.log(chalk.bgWhite.blue(`Género: ${user.gender}`));
    console.log(chalk.bgWhite.blue(`Timestamp: ${user.timestamp}`));
    console.log(chalk.red('-----------'));
  }) 
  usuariosPorGenero = _.groupBy(users, 'gender');
  console.log(usuariosPorGenero);
  res.status(200).json(users);
  
})
app.listen(PORT, () => {
  console.log(`Servidor en ejecución en http://localhost:${PORT}`);
});