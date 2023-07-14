const { Schema, model } = require('mongoose')

const alertsObjectSchema = new Schema({
  crypto: { type: String, required: true, unique: true },
  min: { type: String, required: true },
  max: { type: String, required: true },
  time: { type: String, required: true }
})

const alertsSchema = new Schema({
  userId: { type: String, required: true, unique: true },
  alerts: [alertsObjectSchema]
})

const alertsModel = model('alert', alertsSchema)

module.exports = alertsModel
