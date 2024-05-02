const express = require("express");
const router = express.Router();

const {
    getPosts,
    getPost,
    createPost,
    addLikeToPost,
} = require("../controllers/postController");

//GET all posts
router.get("/", getPosts)
//GET a single post
router.get("/:id", getPost)
//CREAT a post
router.post("/", createPost)
//ADD a like to post
router.post("/:postId/like", addLikeToPost)

module.exports = router;