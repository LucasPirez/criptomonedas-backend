require('dotenv').config()
const cors = require('cors')
const express = require('express')
const app = express()
require('./mongo')
const usersRouter = require('./controllers/usersRouter')
const alertsRouter = require('./controllers/alertsRouter')
const handleErrors = require('./middleware/handleErrors')

// const app = http.createServer((req, res) => {
//   res.writeHead(200, { "Content-Type": "application/json" });
//   res.end(JSON.stringify({ hola: "oeuoe" }));
// });

app.use(cors())
app.use(express.json())

app.use('/users', usersRouter)
app.use('/alerts', alertsRouter)

app.use(handleErrors)

const PORT = process.env.PORT

const server = app.listen(PORT, () => {
  console.log('server running in 3001')
})

module.exports = { app, server }
