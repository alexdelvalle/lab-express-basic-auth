const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    fullName: {
        type: String,
        required: [true, "Tell us your name."]
    },
    username: {
        type: String,
        required: [true, "You must create a username."],
    },
    encryptedPassword: {
        type: String,
        required: [true, "We need a password"]
    }
  },
  {
    timestamps: true
  }
);

const UserModel = mongoose.model("User", userSchema);

module.exports = UserModel;
