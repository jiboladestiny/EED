import mongoose from "mongoose";

const enrolledSchema = new mongoose.Schema({
  userId: String,
  courseId: String,
  isStarted: Number,
  Progress: Number,
});

const Enrolled =
  mongoose.models.enrolled || mongoose.model("enrolled", enrolledSchema);
export default Enrolled;
