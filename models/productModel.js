const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema ({
  name: { type: String, trim: true, required: true },
  description: { type: String, trim: true, required: true },
  price: { type: Number, trim: true, required: true },
  sku: { type: String, trim: true, required: true },
  assessment: {
    type: Schema.Types.ObjectId,
    ref: "Assessment"
  },
  relatedProducts: [{
    type: Schema.Types.ObjectId,
    ref: "Product"
  }]
}, { timestamps: true });

productSchema.pre('save', function (next) {
  this.price.display = Number(Number(this.price.display).toFixed(2));
  next();
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
