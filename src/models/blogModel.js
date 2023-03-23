import { string } from "joi";
import mongoose from "mongoose";

const blogSchema = new mongoose.Schema(
  {
    title: String,
    author: String,
    content: String,
    postedDate:String,
    image: String,
    comments: [
      {
        blog_id: {
          type: mongoose.Schema.ObjectId,
          required: true,
        },
        email: {
          type: String,
          required: true,
        },
        comment: {
          type: String,
          required: [true, "Please add a comment"],
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
