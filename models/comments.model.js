const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Aquí el esquema
const commentSchema = new Schema({
  names: { type: Schema.Types.ObjectId, ref: 'User' },
  activities: { type: Schema.Types.ObjectId, ref: 'User' },
  comentary: String,
  rating:Number

},
  {
    timestamps: { timestamps: true }
  });

// const park = mongoose.model("park.model", placeSchema);

module.exports = mongoose.model('Comment', commentSchema)