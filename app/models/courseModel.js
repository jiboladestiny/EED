import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  userId: {
    type: String,
  },
  title: {
    type: String,
    require: [true, "Please provide a title"],
    unique: true,
  },
  url: {
    type: String,
    require: [true, "Please provide a image"],
  },
  publicId: {
    type: String,
    require: [true, "Please provide a public id"],
  },
  instructor: {
    type: String,
  },
  description: {
    type: String,
  },
});

const Course = mongoose.models.courses || mongoose.model("courses", userSchema);
export default Course;
