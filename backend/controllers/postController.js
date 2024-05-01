//Post Model
const Post = require("../models/postModel");

//Import mongoose
const mongoose = require("mongoose");

// GET all Posts
const getPosts = async (req, res) => {
    try {
        const posts = await Post.find({}).sort({createdAt: -1})
            .populate({
                path: "comments",
                model: "Comment",
            })
            .sort({createdAt: -1});

        res.status(200).json(posts);
    } catch(err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
}

// GET a single post
const getPost = async (req, res) => {
    const { id } = req.params;

    // Check if id is MongoDB valid
    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "No such Product: Id invalid" });
    }

    try {
        const post = await Post.findById(id)
            .populate({
                path: "comments",
                model: "Comment",
            })

        if(!post) {
            return res
                .status(404)
                .json({ error: "No such post: Post does not exist" });
        }
        res.status(200).json(post);
    } catch(err) {
        console.error(err);
        res.status(500).json({ error: "Internal server error" });
    }
};


// CREATE a post
const createPost = async (req, res) => {
    const {subject, author, linkedin} = req.body;

    try {
        const post = await Post.create({subject, author, linkedin})
        res.status(200).json(post)
    } catch(err) {
        res.status(400).json({error: err.message})
    }
}

// Add a like to a post
const addLikeToPost = async (req, res) => {
    const { postId } = req.params;

    try {
        const post = await Post.findById(postId);

        if (!post) {
            return res.status(404).json({ error: "Post not found" });
        }

        // Increment the likes count in the post
        post.likes += 1;
        await post.save();

        res.status(201).json({ message: "Like added successfully" });
        console.log("Like function is working");
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server error" });
    }
};

// Exports the functions
module.exports = {
    getPosts,
    getPost,
    createPost,
    addLikeToPost,
}