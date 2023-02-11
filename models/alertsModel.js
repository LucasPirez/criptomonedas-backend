const { Schema, model } = require("mongoose");

const alertsSchema = new Schema({
  crypto: String,
  min: Number,
  max: Number,
  time: Date,
});

const alertsModel = model("alert", alertsSchema);

module.exports = alertsModel;
