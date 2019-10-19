const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const resultSchema = new Schema ({
  company: {
    type: Schema.Types.ObjectId,
    ref: "Company"
  },
  order: {
    type: Schema.Types.ObjectId,
    ref: "Order"
  },
  product: {
    type: Schema.Types.ObjectId,
    ref: "Product"
  }
}, { timestamps: true });

const Result = mongoose.model("Result", resultSchema);

module.exports = Result;
