import express, { Request, Response } from 'express'
import usersRouter from './controllers/usersRouter'
import alertsRouter from './controllers/alertsRouter'

require('dotenv').config()
const cors = require('cors')

const app = express()
require('./mongo')

// const app = http.createServer((req, res) => {
//   res.writeHead(200, { "Content-Type": "application/json" });
//   res.end(JSON.stringify({ hola: "oeuoe" }));
// });
// 1596persona

// mongodb+srv://<username>:<password>@cluster0.pmrvy.mongodb.net/?retryWrites=true&w=majority

app.use(cors())
app.use(express.json())

const User = require('./models/UserModel')

app.get('/', (_, res, next) => {
  User.find({})
    .then((data: Object) => {
      res.json(data)
    })
    .catch((error: Error) => {
      next(error)
    })
})

app.get('/prueba/:id', (req, res, next) => {
  const id = req.params.id

  User.findById(id)
    .then((data: Object) => {
      if (data) {
        res.json(data)
      } else {
        res.status(404).end()
      }
    })
    .catch((err: Error) => {
      next(err)
    })
})

app.use('/users', usersRouter)
app.use('/alerts', alertsRouter)

interface ErrorHandlers {
  [key: string]: (response: Response, error?: any) => void
}
const error_handlers: ErrorHandlers = {
  CastError: (response) =>
    response.status(400).send({
      error: 'malformed'
    }),
  JsonWebTokenError: (response) =>
    response.status(401).json({ error: 'token missing or invalid' }),
  ValidationError: (response, error) =>
    response.status(409).json({
      error: error.message
    }),
  defaultError: (response) =>
    response.status(500).json({ error: 'default Error' })
}

app.use((error: Error, _req: Request, response: Response) => {
  console.log('error index.js', error.name)
  const handler = error_handlers[error.name] || error_handlers.defaultError

  handler(response, error)
})

const PORT = process.env.PORT

const server = app.listen(PORT, () => {
  console.log('server running in 3001')
})

module.exports = { app, server }
