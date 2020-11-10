const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
require('dotenv/config');

const app = express();

app.set("port", process.env.PORT || 5000);

/* Middlewares */
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

// Print JSONS
app.use(
    express.urlencoded({
      extended: true
    })
  );
app.use(express.json());


/* Routes */
app.use("/api/form", require("./routes/form"));
app.use("/api/template", require("./routes/template"));
// Methods related to access (Register, Log In)
app.use("/", require("./routes/access"));

// Home page of the logged user
app.use("/home", require("./routes/home"));

// Xyz : later can be Form, User, ...
// Tested from Postman with GET `http://localhost:3000/api/xyz, ....
// Running 
//  - development : npm run dev // with nodemon!
//  - default :     npm start   // default script to start node server!
//
// Note: If doesn't connect to database, remember add your current IP address in Network access tab in Mongo Atlas - Cluster 0

module.exports = app;