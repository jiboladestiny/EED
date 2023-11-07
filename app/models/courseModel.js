import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  userId: {
    type: String
  },
  title: {
    type: String,
    require: [true, "Please provide a title"],
    unique: true,
  },
  image: {
    type: String,
    require: [true, "Please provide a image"],
  },
  instructor: {
    type: String
  },
  description: {
    type: String,
  }
});

const Course = mongoose.models.courses || mongoose.model("courses", userSchema);
export default Course;
