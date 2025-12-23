import Blog from "../model/blog.model.js";
export const createBlog = async (req, res) => {
  const { title, subtitle, description } = req.body;
  const data = await Blog.create({
    title,
    subtitle,
    description,
  });
  res.status(200).json({
    message: "successfully added a blog ",
    data,
  });
};
export const getBlog = async (req, res) => {
  const data = await Blog.find();
  res.json({
    message: "successfully fetched blogs ",
    data,
  });
};
export const deleteBlog = async (req, res) => {
  try {
    const id = req.params.id;
    await Blog.findByIdAndDelete(id);
    return res.json({
      message: "successfully deleted blog",
    });
  } catch (error) {
    return res.json({
      message: "error while deleting",
      error: error.message,
    });
  }
};
export const updateBlog = async (req, res) => {
  const { title, subtitle, description } = req.body;
  const id = req.params.id;
  const data = await Blog.findByIdAndUpdate(id, {
    title,
    subtitle,
    description,
  });
  res.json({
    message: "successfully updated blog ",
    data,
  });
};
export const getSingleBlog = async (req, res) => {
  const id = req.params.id;
  const data = await Blog.findById(id);
  if (!data) {
    return res.status(404).json({
      message: "cant get respective blog",
    });
  }
  res.status(200).json({
    message: "successfully fetched   respective blog",
    data,
  });
};
