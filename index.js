require("dotenv").config();
const cors = require("cors");
const express = require("express");
const app = express();
require("./mongo");
const usersRouter = require("./controllers/usersRouter");
const alertsRouter = require("./controllers/alertsRouter");

// const app = http.createServer((req, res) => {
//   res.writeHead(200, { "Content-Type": "application/json" });
//   res.end(JSON.stringify({ hola: "oeuoe" }));
// });
// 1596persona

// mongodb+srv://<username>:<password>@cluster0.pmrvy.mongodb.net/?retryWrites=true&w=majority

app.use(cors());
app.use(express.json());

const User = require("./models/UserModel");

app.get("/", (req, res, next) => {
  User.find({})
    .then((data) => {
      res.json(data);
    })
    .catch((error) => {
      next(error);
    });
});

app.get("/prueba/:id", (req, res, next) => {
  const id = req.params.id;

  User.findById(id)
    .then((data) => {
      if (data) {
        res.json(data);
      } else {
        res.status(404).end();
      }
    })
    .catch((err) => {
      next(err);
    });
});

const error_handlers = {
  CastError: (response) =>
    response.status(400).send({
      error: "malformed",
    }),
  JsonWebTokenError: (response) =>
    response.status(401).json({ error: "token missing or invalid" }),
  ValidationError: (response, error) =>
    response.status(409).json({
      error: error.message,
    }),
  defaultError: (response) => response.status(500).end(),
};

app.use((error, request, response, next) => {
  console.log(error);

  const handler = error_handlers[error.name] || error_handlers.defaultError;

  handler(response, error);
});

app.use("/users", usersRouter);
app.use("/alerts", alertsRouter);

const PORT = process.env.PORT;

const server = app.listen(PORT, () => {
  console.log("server running in 3001");
});

module.exports = { app, server };
