const Comment = require("../models/commentModel");
const Post = require("../models/postModel");

// Create a new comment
const createComment = async (req, res) => {
    const { postId } = req.params;

    try {
        const post = await Post.findById(postId);

        if(!post) {
            return res.status(404).json({ error: "Post not found" });
        }

        const newComment = new Comment({
            text: req.body.text,
            author: req.body.author,
        });

        await newComment.save();

        post.comments.push(newComment);
        await post.save();

        res.status(201).json(newComment);
        console.log("comment post function is working");
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Server error" });
    }
};

module.exports = { createComment };