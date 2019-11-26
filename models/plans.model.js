const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Aquí el esquema
const planSchema = new Schema({
  title:String,
  details: { type: Schema.Types.ObjectId, ref: 'User' },
  atending:[{ type: Schema.Types.ObjectId, ref: 'User' }],
  plan:{
    type:String,
    enum: ['bar', 'club', 'cinema', 'coffe shop', 'play football', 'play basketball', 'play tennis', 'play padel']
  },
  date:Date,
  description:String,
  location:String

},
  {
    timestamps: { timestamps: true }
  });


module.exports = mongoose.model('Plan', planSchema)