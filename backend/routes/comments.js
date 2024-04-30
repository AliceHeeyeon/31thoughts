const express = require("express");
const router = express.Router();
const {
    createComment
} = require("../controllers/commentController");

// Create a new comment for a specific post
router.post('/posts/:postId/comments', createComment)

module.exports = router
