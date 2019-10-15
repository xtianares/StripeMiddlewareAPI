const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema ({
  name: { type: String, trim: true, required: true, unique: true },
  description: { type: String, trim: true, required: true },
  thumbnail: { type: String, trim: true, default: "http://placehold.it/350x350.jpg&text=IMAGE" },
  price: { type: Number, trim: true, required: true },
  sku: { type: String, trim: true, required: true, unique: true },
  assessment: {
    type: Schema.Types.ObjectId,
    ref: "Assessment"
  },
  relatedProducts: [{
    type: Schema.Types.ObjectId,
    ref: "Product"
  }]
}, { timestamps: true });

// to make both name and sku unique
productSchema.index({
  name: 1,
  sku: 1
}, {
  unique: true,
});

// saving price to correct format 0.00
productSchema.pre('save', function (next) {
  this.price = Number(Number(this.price).toFixed(2));
  next();
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
