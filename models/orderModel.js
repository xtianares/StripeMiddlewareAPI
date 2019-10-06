const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const OrderSchema = new Schema ({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  items: [{
    assessment: {
      type: Schema.Types.ObjectId,
      ref: "Assessment"
    },
    quantity: { type: Number, default: 1 }
  }],
  // results: [{
  //   type: Schema.Types.ObjectId,
  //   ref: "Result"
  // }]
}, { timestamps: true });

const Order = mongoose.model("Order", OrderSchema);

module.exports = Order;
