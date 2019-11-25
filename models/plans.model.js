const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Aquí el esquema
const planSchema = new Schema({
  name: { type: Schema.Types.ObjectId, ref: 'User' },
  activities: { type: Schema.Types.ObjectId, ref: 'User' }

},
  {
    timestamps: { timestamps: true }
  });


module.exports = mongoose.model('Plan', planSchema)