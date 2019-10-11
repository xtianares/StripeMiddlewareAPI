const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const OrderSchema = new Schema ({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  items: [{
    product: {
      type: Schema.Types.ObjectId,
      ref: "Product"
    },
    quantity: { type: Number, default: 1 }
  }],
  results: [{
    type: Schema.Types.ObjectId,
    ref: "Result"
  }]
}, { timestamps: true });

const Order = mongoose.model("Order", OrderSchema);

module.exports = Order;
