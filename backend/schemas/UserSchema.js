const { Schema } = require("mongoose");

// Simple user schema for email/password auth
const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  passwordHash: {
    type: String,
    required: true,
  },
});

module.exports = { UserSchema };


