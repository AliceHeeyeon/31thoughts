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
        const post = await Post.findById(id).populate({
            path: "comments",
            model: "Comment",
        });

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
    const {subject, author, text, linkedin} = req.body;

    try {
        const post = await Post.create({subject, author, text, linkedin})
        res.status(200).json(post)
    } catch(err) {
        res.status(400).json({error: err.message})
    }
}

// Exports the functions
module.exports = {
    getPosts,
    getPost,
    createPost,
}