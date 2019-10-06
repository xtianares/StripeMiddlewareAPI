const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AssessmentSchema = new Schema ({
  name: { type: String, trim: true, required: true },
  description: { type: String, trim: true, required: true },
  price: { 
    display: { type: Number, trim: true, required: true },
    currency: { type: String, trim: true, default: "USD" }
  },
  relatedProducts: [{
    type: Schema.Types.ObjectId,
    ref: "Assessment"
  }]
}, { timestamps: true });

AssessmentSchema.pre('save', function (next) {
  this.price.display = Number(Number(this.price.display).toFixed(2));
  next();
});

const Assessment = mongoose.model("Assessment", AssessmentSchema);

module.exports = Assessment;
