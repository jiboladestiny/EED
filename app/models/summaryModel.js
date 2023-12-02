import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  courseId: {
    type: String,
  },
  outline: {
    type: String,
    unique: true,
  },
  url: {
    type: String,
  },
  publicId: {
    type: String,
  },
  description: {
    type: String,
  },
});

const Summary =
  mongoose.models.summarys || mongoose.model("summarys", userSchema);
export default Summary;
