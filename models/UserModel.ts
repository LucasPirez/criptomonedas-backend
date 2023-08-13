import { Schema, model } from "mongoose";
import uniqueValidator from "mongoose-unique-validator";

const UserSchema = new Schema({
  UserNameComplete: String,
  userAlias: { type: String, unique: true },
  email: { type: String, unique: true },
  DateCreate: Date,
  password: String,
});

UserSchema.set("toJSON", {
  transform: (_document, returnedObject) => {
    returnedObject.id = returnedObject._id;
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

const UserModel = model("User", UserSchema);

UserSchema.plugin(uniqueValidator);
// const user = new UserModel({
//   UserName: "roberto",
//   UserLastName: "roberto",
//   DateCreate: new Date(),
//   CriptoSubscribes: { min: 40, max: 50 },
// });

// user
//   .save()
//   .then((result) => {
//     console.log(result);
//     connection.close();
//   })
//   .catch((err) => {
//     console.log(err);
//   });

module.exports = UserModel;
