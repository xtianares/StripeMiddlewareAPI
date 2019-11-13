const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AssessmentSchema = new Schema ({
  // product: {
  //   type: Schema.Types.ObjectId,
  //   ref: "Product"
  // },
  name: {
    type: Schema.Types.ObjectId,
    ref: "Company",
    required: true,
    unique: true
  },
  questions: [{ 
    type: String, 
    trim: true, 
    required: true 
  }],
}, { timestamps: true });

const Assessment = mongoose.model("Assessment", AssessmentSchema);

module.exports = Assessment;
