import { createBlog, getBlogs, deleteBlog } from "../services/blog.service.js";

export const addBlog = async (req, res) => {
  const image = req.file ? req.file.filename : null;

  await createBlog({
    title: req.body.title,
    code: req.body.code,
    description: req.body.description,
    image,
  });

  res.json({
    success: true,
    message: "Blog created successfully",
  });
};

export const getAllBlogs = async (req, res) => {
  const blogs = await getBlogs();
  res.json({ success: true, data: blogs });
};

export const removeBlog = async (req, res) => {
  await deleteBlog(req.params.id);
  res.json({ success: true, message: "Blog deleted" });
};
