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
  product: {
    type: Schema.Types.ObjectId,
    ref: "Product"
  }
}, { timestamps: true });

const Result = mongoose.model("Result", resultSchema);

module.exports = Result;
