const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const OrderSchema = new Schema ({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  items: [{
    _id: false,
    product: {
      type: Schema.Types.ObjectId,
      ref: "Product",
      required: true
    },
    quantity: { type: Number, default: 1 }
  }],
  // items: [{
  //   type: Schema.Types.ObjectId,
  //   ref: "Product",
  //   required: true
  // }],
  results: [{
    type: Schema.Types.ObjectId,
    ref: "Result"
  }]
}, { timestamps: true });

const Order = mongoose.model("Order", OrderSchema);

module.exports = Order;
