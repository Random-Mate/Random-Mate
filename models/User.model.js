const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({


  name:String,
  age: Number,
  email: String,
  password: String,
  photo: {
    type: File,
    default: ''},
  plans: [{ type: Schema.Types.ObjectId, ref: 'Plan' }],
  description: String,
  activities: [],
  comments: { type: Schema.Types.ObjectId, ref: 'Comment' },
  rating: { type: Schema.Types.ObjectId, ref: 'Comment' }
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

const User = mongoose.model('User', userSchema);
module.exports = User;
