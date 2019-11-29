const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({

  name: String,
  lastName: String,
  age: Number,
  email: String,
  ubication: String,
  password: String,
  imgName: String,
  imgPath: String,
  plans: [{ type: Schema.Types.ObjectId, ref: 'Plan' }],
  description: String,
  activities: {
    type: String,
    enum: ['bar', 'club', 'cinema', 'coffe shop', 'play football', 'play basketball', 'play tennis', 'play padel']
  },
  comments: { type: Schema.Types.ObjectId, ref: 'Comment' },

}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

const User = mongoose.model('User', userSchema);
module.exports = User;
