const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AssessmentSchema = new Schema ({
  name: {
    type: String,
    trim: true,
    required: true,
    unique: true
  },
  sku: {
    type: String,
    trim: true,
    required: true,
    unique: true
  },
  questionIds: [{ 
    type: String, 
    trim: true, 
    required: true 
  }],
}, { timestamps: true });

AssessmentSchema.virtual('questions', {
  ref: 'Question',
  localField: 'questionIds',
  foreignField: 'questionId',
});

AssessmentSchema.set('toObject', { virtuals: true });
AssessmentSchema.set('toJSON', { virtuals: true });


const Assessment = mongoose.model("Assessment", AssessmentSchema);

module.exports = Assessment;
