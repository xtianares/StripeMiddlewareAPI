const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const OrderSchema = new Schema ({
  company: {
    type: Schema.Types.ObjectId,
    ref: "Company",
    required: true
  },
  items: [{
    _id: false,
    product: {
      type: Schema.Types.ObjectId,
      ref: "Product",
      required: true
    },
    price: { type: Number, trim: true, required: true },
    quantity: { type: Number, default: 1 }
  }],
  discount: { type: Number, trim: true },
  total: { type: Number, trim: true, required: true },
  results: [{
    type: Schema.Types.ObjectId,
    ref: "Result"
  }],
  stripe: {
    orderId: { type: String, trim: true },
    subscriptionId: { type: String, trim: true },
  },
  paid: { type: Boolean, default: false }
}, { timestamps: true });

// OrderSchema.pre('save', function (next) {
//   let orderTotal = 0;
//   this.products.forEach(product => {
//     orderTotal = orderTotal + product.price * product.quantity;
//   });
//   this.total = Number(Number(orderTotal).toFixed(2));
//   next();
// });

const Order = mongoose.model("Order", OrderSchema);

module.exports = Order;
