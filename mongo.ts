import mongoose from "mongoose";


const { MONGO_DB_URI, MONGO_DB_URI_TEST, NODE_ENV } = process.env;

const connectionString = NODE_ENV === "test" ? MONGO_DB_URI_TEST as string : MONGO_DB_URI as string;

// const connectionOptions:ConnectOptions ={
//     useUnifiedTopology: true,
//   }

mongoose.connect(connectionString)
  .then(() => {
    console.log("database Connected");
  })
  .catch((error) => {
    console.log(error);
  });

process.on("uncaughException", () => {
  mongoose.connection.close();
});
