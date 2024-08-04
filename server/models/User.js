const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    subscription: {
      plan: { type: String, default: null },
      startDate: { type: Date, default: null },
    },
  },
  {
    timestamps: true,
  }
);

userSchema.methods.validPassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

const UserModel = mongoose.model("User", userSchema);
module.exports = UserModel;
