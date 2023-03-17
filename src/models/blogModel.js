import mongoose from "mongoose";

const blogSchema = new mongoose.Schema(
  {
    title: String,
    author: String,
    content: String,
    image: String,
    comments: [
      {
        user_id: {
          type: mongoose.Schema.ObjectId,
          required: true,
          ref: "User",
        },
        email: {
          type: String,
          required: true,
        },
        comment: {
          type: String,
          required: [true, "Please add a comment"],
        },
        postedDate: {
          type: String,
          required: true,
        },
      },
    ],
    likes: [
      {
        user_id: {
          type: mongoose.Schema.ObjectId,
          required: true,
          ref: "User",
        },
      },
    ],
  },
  { timestamps: true }
);
export default mongoose.model('blogs', blogSchema);
