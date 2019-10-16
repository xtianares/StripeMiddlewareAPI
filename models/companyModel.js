const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CompanySchema = new Schema ({
  name: { type: String, trim: true, required: true },
  size: { type: String, trim: true },
  industry: { type: String, trim: true },
  address: { type: String, trim: true },
  city: { type: String, trim: true },
  state: { type: String, trim: true },
  zipcode: { type: String, trim: true },
  country: { type: String, trim: true },
  users: [{
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true
  }],
}, { timestamps: true });

const Company = mongoose.model("Company", CompanySchema);

module.exports = Company;
