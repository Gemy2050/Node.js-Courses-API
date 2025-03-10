const mongoose = require("mongoose");
const validator = require("validator");
const roles = require("../utils/roles");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: [validator.isEmail, "Please enter a valid email"],
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: [roles.USER, roles.ADMIN, roles.MANAGER],
      default: roles.USER,
    },
    avatar: {
      type: String,
      default: "uploads/profile.jpg",
    },
  },
  {
    toJSON: {
      transform(_, ret) {
        ret = { id: ret._id, ...ret };
        delete ret._id;
        delete ret.__v;
        delete ret.password;
        return ret;
      },
    },
  }
);

module.exports = mongoose.model("User", userSchema);
