const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// const bcrypt = require("bcrypt");
// const saltRounds = 10;

const UserSchema = new Schema ({
  firstName: { type: String, trim: true, required: true },
  lastName: { type: String, trim: true, required: true },
  email: {
    type: String,
    lowercase: true,
    trim: true,
    required: true,
    unique: true,
    match: [/.+@.+\..+/, "Please enter a valid email address"]
  },
  phone: { type: String, trim: true, required: true },
  // username: { type: String, trim: true, required: true, unique: true },
  password: { type: String, trim: true, required: true },
  company: {
    type: Schema.Types.ObjectId,
    ref: "Company"
  },
  role: { type: String, trim: true, default: "customer" },
}, { timestamps: true });

// to prevent returning the user's password
UserSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.password;
  return obj;
}

const User = mongoose.model("User", UserSchema);

module.exports = User;
