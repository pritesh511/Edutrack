import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
  title: { type: String, require: true },
  description: { type: String, require: true },
  createdAt: { type: Date, default: new Date()},
});

const Blog = mongoose.models.Blog || mongoose.model("Blog", blogSchema);

export default Blog;
