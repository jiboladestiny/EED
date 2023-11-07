import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  courseId: String,
  question: String,
  options: [String],
  correctAnswer: String,
});

const Quiz = mongoose.models.quiz || mongoose.model("quiz", userSchema);
export default Quiz;
