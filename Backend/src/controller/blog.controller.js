import { createBlog, getBlogs, deleteBlog } from "../services/blog.service.js";

export const addBlog = async (req, res) => {
  try {
    const image = req.file ? req.file.filename : null;

    await createBlog({
      title: req.body.title,
      code: req.body.code,
      description: req.body.description,
      image,
    });

    res.status(201).json({
      success: true,
      message: "Blog created successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ✅ THIS FUNCTION WAS MISSING
export const getAllBlogs = async (req, res) => {
  try {
    const blogs = await getBlogs();
    res.json({ success: true, data: blogs });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch blogs",
    });
  }
};

export const removeBlog = async (req, res) => {
  try {
    await deleteBlog(req.params.id);
    res.json({ success: true, message: "Blog deleted" });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
