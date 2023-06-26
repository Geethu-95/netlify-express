const express = require('express')
const bodyParser = require('body-parser')
const { init } = require('./db')
const routes = require('./routes')
const cors = require('cors')

const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(routes)

// app.use(cors())

app.use(cors());
const corsOptions = {
  origin: "http://localhost:3000"
};

init().then(() => {

  console.log('Server running')
})