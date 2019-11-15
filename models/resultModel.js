const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const resultSchema = new Schema ({
  name: {
    type: String,
    trim: true,
    required: true
  },
  results: [{
    type: Boolean,
    trim: true,
    required: true
  }],
  company: {
    type: Schema.Types.ObjectId,
    ref: "Company",
    required: true
  },
  // order: {
  //   type: Schema.Types.ObjectId,
  //   ref: "Order"
  // },
  assessment: {
    type: Schema.Types.ObjectId,
    ref: "Assessment",
    required: true
  }
}, { timestamps: true });

const Result = mongoose.model("Result", resultSchema);

module.exports = Result;
