const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const resultSchema = new Schema ({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  order: {
    type: Schema.Types.ObjectId,
    ref: "Order"
  },
  assessment: {
    type: Schema.Types.ObjectId,
    ref: "Assessment"
  }
}, { timestamps: true });

const Result = mongoose.model("Result", resultSchema);

module.exports = Result;
