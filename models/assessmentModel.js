const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AssessmentSchema = new Schema ({
  product: {
    type: Schema.Types.ObjectId,
    ref: "Product"
  },
  questions: [{ 
    type: String, 
    trim: true, 
    required: true 
  }],
}, { timestamps: true });

const Assessment = mongoose.model("Assessment", AssessmentSchema);

module.exports = Assessment;
