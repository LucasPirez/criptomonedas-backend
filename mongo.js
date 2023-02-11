const mongoose = require("mongoose");
const { Schema, model, connection } = mongoose;

const { MONGO_DB_URI, MONGO_DB_URI_TEST, NODE_ENV } = process.env;

const connectionString = NODE_ENV === "test" ? MONGO_DB_URI_TEST : MONGO_DB_URI;

mongoose
  .connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // useFindAndModify: false,
    // useCreateIndex: true,
  })
  .then(() => {
    console.log("database Connected");
  })
  .catch((error) => {
    console.log(error);
  });

process.on("uncaughException", () => {
  mongoose.connection.disconnect();
});
