const express = require('express')
const cors = require("cors");
const bodyParser = require("body-parser");
const colors = require('colors')

const { mongoose } = require("./db/mongoose");

const app = express()
const port = process.env.PORT || 3000

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

const userRoutes = require('./routes/user')
const addressRoutes = require('./routes/address')

app.use("/api/user", userRoutes)
app.use("/api/address", addressRoutes)

app.listen(port, (err) => {
    if (err) {
      return console.log("Error running the app");
    }
    console.log(`App is running on port ${port}`);
  })