import express, { Request, Response } from 'express'
import usersRouter from './controllers/usersRouter'
import alertsRouter from './controllers/alertsRouter'
import coinGeckoRouter from './controllers/coingGeckoRouter'
import { error_handlers } from './errors/error'

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

// const User = require('./models/UserModel')

// app.get('/', (_, res, next) => {
//   User.find({})
//     .then((data: Object) => {
//       res.json(data)
//     })
//     .catch((error: Error) => {
//       next(error)
//     })
// })

// app.get('/prueba/:id', (req, res, next) => {
//   const id = req.params.id

//   User.findById(id)
//     .then((data: Object) => {
//       if (data) {
//         res.json(data)
//       } else {
//         res.status(404).end()
//       }
//     })
//     .catch((err: Error) => {
//       next(err)
//     })
// })

app.use('/users', usersRouter)
app.use('/alerts', alertsRouter)
app.use('/apiCoinGecko', coinGeckoRouter)

app.use((error: Error, _req: Request, response: Response) => {
  console.log('error index.js', error.name)
  if (error.name) {
    const handler = error_handlers[error.name] || error_handlers.defaultError

    handler(response, error)
  }
})

const PORT = process.env.PORT

const server = app.listen(PORT, () => {
  console.log('server running in 3001')
})

module.exports = { app, server }
