const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const resultSchema = new Schema ({
  name: {
    type: String,
    trim: true,
    required: true
  },
  results: [{
    questionId: {
      type: String,
      trim: true,
      required: true
    },
    answer: {
      type: Boolean,
      trim: true,
      required: true
    }
  }],
  company: {
    type: Schema.Types.ObjectId,
    ref: "Company",
    required: true
  },
  stripe: {
    productId: { type: String, trim: true },
    subscriptionId: { type: String, trim: true }
  },
  assessment: {
    type: Schema.Types.ObjectId,
    ref: "Assessment",
    required: true
  }
}, { timestamps: true });

const Result = mongoose.model("Result", resultSchema);

module.exports = Result;
