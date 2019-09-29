const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema ({
  username: { type: String, trim: true, required: true, unique: true },
  password: { type: String, trim: true, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: {
    type: String,
    trim: true,
    unique: true,
    required: true,
    match: [/.+@.+\..+/, "Please enter a valid email address"]
  },
  address: { type: String, trim: true, required: true },
  city: { type: String, trim: true, required: true },
  state: { type: String, trim: true, required: true },
  zipcode: { type: String, trim: true, required: true },
  country: { type: String, trim: true, required: true },
  orders: [{
    type: Schema.Types.ObjectId,
    ref: "Order"
  }],
  // asssessments need to be referenced with the order?
  assessments: [{
    type: Schema.Types.ObjectId,
    ref: "Assessment"
  }],
  // results need to be referenced with the order?
  results: [{
    type: Schema.Types.ObjectId,
    ref: "Result"
  }],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

const User = mongoose.model("User", userSchema);

module.exports = User;
