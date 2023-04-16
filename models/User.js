const { Schema, model } = require('mongoose');
const assignmentSchema = require('./Reaction');

// Schema to create Student model
const userSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    thoughts: [thoughtSchema],
    friends: [userSchema]
  },
  {
    toJSON: {
      getters: true,
      virtuals: true
    },
  }
);

userSchema
  .virtual('friendCount')
  .get(function () {
    return `Total Friends: ${this.friends.length}`;
  })

const User = model('user', userSchema);

module.exports = User;
