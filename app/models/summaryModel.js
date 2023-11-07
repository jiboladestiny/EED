import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  courseId: {
    type: String,
  },
  outline: {
    type: String,
    require: [true, "Please provide a outline"],
    unique: true,
  },
  vedio: {
    type: String,
    require: [true, "Please provide a vedio"],
  },
  description: {
    type: String,
  },
});

const Summary =
  mongoose.models.summarys || mongoose.model("summarys", userSchema);
export default Summary;
