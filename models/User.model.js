const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const {
  REQUIRED_FIELD,
  INVALID_EMAIL,
  INVALID_PASSWORD,
  ALREADY_IN_USE,
} = require("../config/errorMsg.config");

const SALT_ROUNDS = 10;
const EMAIL_PATTERN =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const PASSWORD_PATTERN = /^.{8,}$/;

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      match: [EMAIL_PATTERN, INVALID_EMAIL],
      required: [true, REQUIRED_FIELD],
      trim: true,
      lowercase: true,
      unique: [true, ALREADY_IN_USE],
    },
    password: {
      type: String,
      required: [true, REQUIRED_FIELD],
      match: [PASSWORD_PATTERN, INVALID_PASSWORD],
    },
    agencyName: {
      type: String,
      required: [true, REQUIRED_FIELD],
    },
    name: {
      type: String,
      required: [true, REQUIRED_FIELD],
    },
    isAdmin: {
      type: Boolean,
      required: [true, REQUIRED_FIELD],
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: (doc, ret) => {
        delete ret.__v;
        delete ret._id;
        delete ret.password;
      },
    },
  }
);

userSchema.pre("save", function (next) {
  const rawPassword = this.password;
  if (this.isModified("password")) {
    bcrypt
      .hash(rawPassword, SALT_ROUNDS)
      .then((hash) => {
        this.password = hash;
        next();
      })
      .catch((err) => next(err));
  } else {
    next();
  }
});

userSchema.methods.checkPassword = function (passwordToCompare) {
  return bcrypt.compare(passwordToCompare, this.password);
};

const User = mongoose.model("User", userSchema);
module.exports = User;
