  import express from "express";
  import Blog from "../models/Blog.js";
  import User from "../models/User.js";
  import { verifyToken } from "../middleware/verifyToken.js";

  const router = express.Router();

  // CREATE a new blog (only for logged-in users)
  router.post("/", verifyToken, async (req, res) => {
    try {
      const { title, summary, cover, content } = req.body;

      if (!title || !summary || !cover || !content) {
        return res.status(400).json({ message: "All fields are required" });
      }

      const newBlog = new Blog({
        title,
        summary,
        cover,
        content,
        author: req.user.userId,
      });

      await newBlog.save();
      res.status(201).json({ message: "Blog created successfully", blog: newBlog });
    } catch (err) {
      res.status(500).json({ message: "Server error", error: err.message });
    }
  });

  // GET all blogs (homepage) with author populated
  router.get("/", async (req, res) => {
    try {
      const blogs = await Blog.find()
        .sort({ createdAt: -1 })
        .populate("author", "username");
      res.json(blogs);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch blogs" });
    }
  });

  // GET single blog by ID with author populated
  router.get("/:id", async (req, res) => {
    try {
      const blog = await Blog.findById(req.params.id).populate("author", "username _id");
      if (!blog) {
        return res.status(404).json({ message: "Blog not found" });
      }
      res.json(blog);
    } catch (err) {
      res.status(500).json({ message: "Server error", error: err.message });
    }
  });

  // GET all blogs by specific username
  router.get("/user/:username", async (req, res) => {
    try {
      const user = await User.findOne({ username: req.params.username });
      if (!user) return res.status(404).json({ message: "User not found" });

      const blogs = await Blog.find({ author: user._id }).populate("author", "username");
      res.status(200).json(blogs);
    } catch (err) {
      res.status(500).json({ message: "Server error", error: err.message });
    }
  });

  // UPDATE blog by ID (only author or admin)
  router.put("/:id", verifyToken, async (req, res) => {
    try {
      const blog = await Blog.findById(req.params.id);
      if (!blog) return res.status(404).json({ message: "Blog not found" });

      const currentUser = req.user;

      if (blog.author.toString() !== currentUser.userId && !currentUser.isAdmin) {
        return res.status(403).json({ message: "Not authorized to update this blog" });
      }

      const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, req.body, { new: true });
      res.status(200).json(updatedBlog);
    } catch (err) {
      res.status(500).json({ message: "Server error", error: err.message });
    }
  });

  // DELETE blog by ID (only author or admin)
  router.delete("/:id", verifyToken, async (req, res) => {
    try {
      const blog = await Blog.findById(req.params.id);
      if (!blog) return res.status(404).json({ message: "Blog not found" });

      const currentUser = req.user;
      if (blog.author.toString() !== currentUser.userId && !currentUser.isAdmin) {
        return res.status(403).json({ message: "Not authorized to delete this blog" });
      }

      await blog.deleteOne();
      res.status(200).json({ message: "Blog deleted successfully" });
    } catch (err) {
      res.status(500).json({ message: "Server error", error: err.message });
    }
  });

  export default router;