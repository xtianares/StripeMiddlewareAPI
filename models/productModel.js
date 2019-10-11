const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema ({
  name: { type: String, trim: true, required: true },
  description: { type: String, trim: true, required: true },
  price: { type: Number, get: getPrice, set: setPrice, required: true },
  sku: { type: String, trim: true, required: true },
  relatedProducts: [{
    type: Schema.Types.ObjectId,
    ref: "Product"
  }]
}, { timestamps: true });

function getPrice(num) {
  return (num / 100).toFixed(2);
}
function setPrice(num) {
  return num * 100;
}

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
