const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Aquí el esquema
const planSchema = new Schema({
  title: String,
  author: { type: Schema.Types.ObjectId, ref: 'User' },
  activity: { type: Schema.Types.ObjectId, ref: 'User' },
  atending: [],
  date: Date,
  description: String,
  location: String

},
  {
    timestamps: { timestamps: true }
  });


module.exports = mongoose.model('Plan', planSchema)