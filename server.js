/* ------------------------------ */
/* Project  : E-Commerce Back End */
/* File     : server.js           */
/* Author   : Vicente Garcia      */
/* Date     : 04/28/2022          */
/* Modified : 04/28/2022          */
/* ------------------------------ */
const express = require('express');
const routes = require('./routes');
// Import sequelize connection
const sequelize = require('./config/connection');
const app = express();
const PORT = process.env.PORT || 3001;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(routes);
// Sync sequelize models to the database, then turn on the server
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening'));
});
//app.listen(PORT, () => { console.log(`App listening on port ${PORT}!`);});
