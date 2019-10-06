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
  password: { type: String, trim: true, required: true },
  company: {
    companyName: { type: String, trim: true, required: true },
    companySize: { type: String, trim: true },
    industry: { type: String, trim: true },
    address: { type: String, trim: true },
    city: { type: String, trim: true },
    state: { type: String, trim: true },
    zipcode: { type: String, trim: true },
    country: { type: String, trim: true }
  },
  // order are associated with the user
  orders: [{
    type: Schema.Types.ObjectId,
    ref: "Order"
  }],
  // asssessment is associated with the order then user
  assessments: [{
    type: Schema.Types.ObjectId,
    ref: "Assessment"
  }],
  // result are associated with the assessment, order and user
  results: [{
    type: Schema.Types.ObjectId,
    ref: "Result"
  }]
}, { timestamps: true });

// to make both username and email unique
// UserSchema.index({
//   email: 1,
// }, {
//   unique: true,
// });

// hash user password before saving into database
// UserSchema.pre('save', function (next) {
//   this.password = bcrypt.hashSync(this.password, saltRounds);
//   next();
// });

// to prevent returning the user's password
UserSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.password;
  return obj;
}

const User = mongoose.model("User", UserSchema);

module.exports = User;
