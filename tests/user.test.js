const mongoose = require("mongoose");
const supertest = require("supertest");
const { app, server } = require("../index");

const api = supertest(app);

test("usuarios se retornan en json", async () => {
  await api
    .post("/users/login")
    .send()
    .expect("Content-Type", /application\/json/);
});

afterAll(() => {
  mongoose.connection.close();
  server.close();
});
