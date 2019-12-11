const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const OrderSchema = new Schema ({
  company: {
    type: Schema.Types.ObjectId,
    ref: "Company",
    required: true
  },
  assessments: [{
    type: String,
    // required: true
  }],
  results: [{
    type: Schema.Types.ObjectId,
    ref: "Result"
  }],
  stripe: {
    invoice: { type: String, trim: true },
    productId: { type: String, trim: true },
    subscriptionId: { type: String, trim: true },
  },
}, { timestamps: true });

// OrderSchema.virtual('assessmentData', {
//   ref: 'Assessments',
//   localField: 'assessments',
//   foreignField: 'sku',
// });

// OrderSchema.set('toObject', { virtuals: true });
// OrderSchema.set('toJSON', { virtuals: true });

const Order = mongoose.model("Order", OrderSchema);

module.exports = Order;
