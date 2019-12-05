const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const QuestionSchema = new Schema ({
  questionId: {
    type: String,
    trim: true,
    required: true,
    unique: true
  },
  category: {
    type: String,
    trim: true,
    required: true
  },
  question: { 
    type: String, 
    trim: true, 
    required: true 
  },
}, { timestamps: true });

const Question = mongoose.model("Question", QuestionSchema);

module.exports = Question;
