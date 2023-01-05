const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const userSchema = new Schema({
  firstName: {
    type: String    
  },
  lastName: {
    type: String    
  },
  passwordHash: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    validate: {
      validator: v => /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/.test(v)
    }
  },
  birthday: {
    type: Date,
    validate: {
      validator: v => v < new Date()
    }
  },
  /* comments: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Comment'
    }
  ] */
});

const User = model('User', userSchema);

module.exports = User;
