const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
 
username:String	,
age:	Number	,
email:	email	,
password:String	,
photo	:file	,
  plans: { type: Schema.Types.ObjectId, ref: 'Plan' }	,
descripton:	String	,
activities:	[],
  comments: { type: Schema.Types.ObjectId, ref: 'Comment' }	,
  rating: { type: Schema.Types.ObjectId, ref: 'Comment' }
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

const User = mongoose.model('User', userSchema);
module.exports = User;
