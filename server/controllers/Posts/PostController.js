const Post = require("../../models/Post");

exports.createPost = async (req, res) => {
  const { title, content, videoUrl } = req.body;

  try {
    const post = await Post.create({
      title,
      content,
      videoUrl,
      userId: req.userId,
    });
    res.status(201).json(post);
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

exports.getPosts = async (req, res) => {
  try {
    const posts = await Post.find().populate("userId", "username email");
    res.json(posts);
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};
