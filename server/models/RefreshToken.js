const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const refreshTokenSchema = new Schema({
  token: {
    type: String,
    required: true
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  fingerprint: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now(),
    validate: {
      validator: v => v < new Date()
    }
  }
});

const RefreshToken = model('RefreshToken', refreshTokenSchema);

module.exports = RefreshToken;
